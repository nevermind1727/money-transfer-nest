import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Services } from 'src/utils/constants';
import { IAuthService } from '../auth';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(Services.AUTH) private readonly authService: IAuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    return this.authService.validateUser({username, password});
  }
}