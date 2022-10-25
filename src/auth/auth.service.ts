import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CannotFindUserException } from 'src/exceptions/CannotFindUser';
import { IUserService } from 'src/user/user';
import { Services } from 'src/utils/constants';
import { comparePasswords } from 'src/utils/helpers';
import { User } from 'src/utils/typeorm/entities/User';
import { CreateUserParams, ValidateUserParams } from 'src/utils/types/queries';
import { IAuthService } from './auth';

@Injectable()
export class AuthService implements IAuthService {
    constructor(@Inject(Services.USERS) private readonly userService: IUserService) {}

    registerUser(params: CreateUserParams): Promise<User> {
        return this.userService.createUser(params)
    }

    async validateUser(params: ValidateUserParams): Promise<User> {
        const existingUser = await this.userService.findUser({username: params.username}, {selectPassword: true})
        if (!existingUser) throw new CannotFindUserException()
        const comparedPassword = await comparePasswords(params.password, existingUser.password)
        if (!comparedPassword) throw new HttpException("Invalid password", HttpStatus.BAD_REQUEST)
        return existingUser;
    }
}
