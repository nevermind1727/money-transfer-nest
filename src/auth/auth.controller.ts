import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Routes, Services } from 'src/utils/constants';
import { IAuthService } from './auth';
import { LoginUserDto } from './dtos/LoginUser.dto';
import { RegisterUserDto } from './dtos/RegisterUser.dto';
import { LocalAuthGuard } from './utils/Guards';

@Controller(Routes.AUTH)
export class AuthController {
    constructor(@Inject(Services.AUTH) private readonly authService: IAuthService) {}

    @Post("/register")
    async registerUser(@Body() registerUserPayload: RegisterUserDto) {
        return instanceToPlain(await this.authService.registerUser(registerUserPayload))
    }

    @Post("/login")
    @UseGuards(LocalAuthGuard)
    loginUser(@Body() loginUserPayload: LoginUserDto) {
        return this.authService.validateUser(loginUserPayload)
    }
}
