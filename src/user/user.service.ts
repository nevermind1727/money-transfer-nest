import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserExistsException } from 'src/exceptions/UserExistsException';
import { getUserSelectors } from 'src/utils/constants';
import { hashPassword } from 'src/utils/helpers';
import { User } from 'src/utils/typeorm/entities/User';
import { CreateUserParams, FindUserOptions, FindUserParams } from 'src/utils/types/queries';
import { Repository } from 'typeorm';
import {IUserService} from "./user"

@Injectable()
export class UserService implements IUserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}
    
    findUser(params: FindUserParams, options?: FindUserOptions): Promise<User> {
        const select = getUserSelectors(options?.selectPassword)
        return this.userRepository.findOne({where: params, select})
    }

    async createUser(params: CreateUserParams) {
        const potentialUser = await this.findUser({username: params.username})
        if (potentialUser) throw new UserExistsException()
        params.password = await hashPassword(params.password)
        const newUser = this.userRepository.create(params)
        return this.userRepository.save(newUser)
    }
}
