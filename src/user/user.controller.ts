import { Controller, Inject } from '@nestjs/common';
import { Services } from 'src/utils/constants';
import {UserService} from "./user.service"


@Controller('user')
export class UserController {
    constructor(@Inject(Services.USERS) private readonly usersService: UserService){}
}
