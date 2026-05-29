import { Module } from '@nestjs/common';
import { ProductServiceController } from './product-service.controller';
import { ProductServiceService } from './product-service.service';
import { DatabaseModule, LoggerModule } from '@app/common';
import { Product } from './product-service/models/product.entity';
import { ProductRepository } from './product-service/product-service.repository';

@Module({
  imports: [LoggerModule, DatabaseModule, DatabaseModule.forFeature([Product])],
  controllers: [ProductServiceController],
  providers: [ProductServiceService, ProductRepository],
})
export class ProductServiceModule { }
