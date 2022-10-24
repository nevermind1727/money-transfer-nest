import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {Services} from "../utils/constants"
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/utils/typeorm/entities/User';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [{
      provide: Services.USERS,
      useClass: UserService
  }],
  exports: [{
    provide: Services.USERS,
    useClass: UserService
}]
})
export class UserModule {}
