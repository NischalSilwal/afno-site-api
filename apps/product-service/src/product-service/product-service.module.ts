import { Module } from '@nestjs/common';
import { ProductService } from './product-service.service';
import { ProductServiceController } from './product-service.controller';
import { DatabaseModule } from '@app/common';
import { ProductRepository } from './product-service.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductServiceController],
  providers: [ProductService, ProductRepository],
})
export class ProductServiceModule { }
