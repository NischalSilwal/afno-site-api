import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from 'nestjs-pino';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { StoreServiceModule } from './store-service.module';

/**
 * Bootstraps the Store microservice.
 * - Uses Pino logger for structured logging
 * - CORS restricted to frontend origins (3000, 3001)
 * - Global ValidationPipe strips unknown fields and auto-transforms payloads
 * - Serves uploaded static assets under /uploads
 */
async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(StoreServiceModule, { bufferLogs: true });
    app.useLogger(app.get(Logger));

    const config = new DocumentBuilder()
        .setTitle('Store Service API')
        .setDescription('Store service API description')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

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

    await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
