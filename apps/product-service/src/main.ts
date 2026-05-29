import 'reflect-metadata';
import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { ProductServiceModule } from './product-service.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from 'nestjs-pino';
import { join } from 'path';
import { AllExceptionsFilter, LoggingInterceptor, ResponseTransformInterceptor } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(ProductServiceModule, { bufferLogs: true });
  
  const logger = app.get(Logger);
  app.useLogger(logger);

  // Enable graceful shutdown
  app.enableShutdownHooks();

  const uploadsDir = join(process.cwd(), 'uploads');

  // CORS configuration
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Global pipes
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: { enableImplicitConversion: true },
  }));

  // Global filters
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost, logger));

  // Global interceptors
  app.useGlobalInterceptors(
    new LoggingInterceptor(logger),
    new ResponseTransformInterceptor(),
  );

  app.useStaticAssets(uploadsDir, {
    prefix: '/uploads',
  });

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  logger.log(`Product Service is running on: http://localhost:${port}`);
}
bootstrap();
