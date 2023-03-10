import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true
    }));
  app.use(
    session({
      name: 'NESTJS_SESSION_ID',
      secret: 'RAOFIN',
      resave: true,
      saveUninitialized: false,
      cookie: {
        maxAge: 86400000 // 1 day
      }
    })
  );

  await app.listen(3000);
}

bootstrap();
