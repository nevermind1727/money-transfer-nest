import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common"
import * as passport from "passport"
import * as session from "express-session"
import { DataSource } from 'typeorm';
import { Session } from './utils/typeorm/entities';
import { TypeormStore } from 'connect-typeorm/out';

async function bootstrap() {
    const PORT = process.env.PORT
    const app = await NestFactory.create(AppModule);
    app.enableCors({origin: ["http://localhost:3000"], credentials: true})
    app.setGlobalPrefix("api")
    app.useGlobalPipes(new ValidationPipe())
    app.use(passport.initialize())
    app.use(passport.session())

    const dataSource = app.get(DataSource)
    const sessionsRepository = dataSource.getRepository(Session)

    app.use(
        session({
            name: "MONEY_TRANSFER_SESSION_ID",
            secret: process.env.COOKIE_SECRET,
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 3600000 * 24,
            },
            store: new TypeormStore().connect(sessionsRepository)
        })
    );
    try {
        await app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
    } catch (err) {
        console.log(err)
    }
}

bootstrap();
