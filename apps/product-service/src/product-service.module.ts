import { Module } from '@nestjs/common';
import { DatabaseModule, LoggerModule, ConfigModule } from '@app/common';
import { ProductModule } from './product/product.module';

/**
 * Main application module for the Product Service.
 * Integrates shared modules and feature modules.
 */
@Module({
  imports: [ConfigModule, LoggerModule, DatabaseModule, ProductModule],
  controllers: [],
  providers: [],
})
export class ProductServiceModule {}
