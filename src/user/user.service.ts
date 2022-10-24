import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserExistsException } from 'src/exceptions/UserExistsException';
import { User } from 'src/utils/typeorm/entities/User';
import { CreateUserParams, FindUserParams } from 'src/utils/types/queries';
import { Repository } from 'typeorm';
import {IUserService} from "./user"

@Injectable()
export class UserService implements IUserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}
    
    findUser(params: FindUserParams): Promise<User> {
        return this.userRepository.findOneBy(params)
    }

    async createUser(params: CreateUserParams) {
        const potentialUser = await this.findUser({username: params.username})
        if (potentialUser) throw new UserExistsException()
        const newUser = this.userRepository.create(params)
        return this.userRepository.save(newUser)
    }
}
