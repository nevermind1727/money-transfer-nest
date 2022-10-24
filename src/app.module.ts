import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './utils/typeorm/entities';


@Module({
    imports: [ConfigModule.forRoot({
        envFilePath: ['.env.development'],
    }), TypeOrmModule.forRoot({
        type: 'mysql',
        host: process.env.MYSQL_DB_HOST,
        port: parseInt(process.env.MYSQL_DB_PORT),
        username: process.env.MYSQL_DB_USERNAME,
        password: process.env.MYSQL_DB_PASSWORD,
        database: process.env.MYSQL_DB_NAME,
        entities,
        synchronize: true,
    }), AuthModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
