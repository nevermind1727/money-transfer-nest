import { Inject, Injectable } from '@nestjs/common';
import { IUserService } from 'src/user/user';
import { Services } from 'src/utils/constants';
import { User } from 'src/utils/typeorm/entities/User';
import { CreateUserParams } from 'src/utils/types/queries';
import { IAuthService } from './auth';

@Injectable()
export class AuthService implements IAuthService {
    constructor(@Inject(Services.USERS) private readonly userService: IUserService) {}

    registerUser(params: CreateUserParams): Promise<User> {
        return this.userService.createUser(params)
    }

    validateUser() {

    }
}
