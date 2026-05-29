import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ProductServiceModule } from './product-service.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from 'nestjs-pino';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(ProductServiceModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));

  const uploadsDir = join(process.cwd(), 'uploads');

  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: { enableImplicitConversion: true },
  }));

  app.useStaticAssets(uploadsDir, {
    prefix: '/uploads',
  });

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
