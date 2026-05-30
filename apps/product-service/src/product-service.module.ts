import { Module } from '@nestjs/common';
import { ProductService } from './product-service.service';
import { ProductServiceController } from './product-service.controller';
import { DatabaseModule, LoggerModule } from '@app/common';
import { ProductRepository } from './product-service.repository';
import { Product } from './models/product.entity';

@Module({
  imports: [LoggerModule, DatabaseModule, DatabaseModule.forFeature([Product])],
  controllers: [ProductServiceController],
  providers: [ProductService, ProductRepository],
})
export class ProductServiceModule { }
