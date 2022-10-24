import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common"

async function bootstrap() {
    const PORT = process.env.PORT
    const app = await NestFactory.create(AppModule);
    app.enableCors({origin: ["http://localhost:3000"], credentials: true})
    app.setGlobalPrefix("api")
    app.useGlobalPipes(new ValidationPipe())
    try {
        await app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
    } catch (err) {
        console.log(err)
    }
}

bootstrap();
