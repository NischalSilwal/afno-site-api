import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product-service/product-service.repository';
import { CreateProductServiceDto } from './product-service/dto/create-product-service.dto';
import { UpdateProductServiceDto } from './product-service/dto/update-product-service.dto';
import { Product } from './product-service/models/product.entity';

@Injectable()
export class ProductServiceService {
  constructor(private readonly productRepository: ProductRepository) { }

  create(createProductServiceDto: CreateProductServiceDto) {
    return this.productRepository.create(new Product(createProductServiceDto));
  }

  findAll() {
    return this.productRepository.find({});
  }

  findOne(id: number) {
    return this.productRepository.findOne({ id });
  }

  update(id: number, updateProductServiceDto: UpdateProductServiceDto) {
    return this.productRepository.findOneAndUpdate({ id }, updateProductServiceDto);
  }

  remove(id: number) {
    return this.productRepository.findOneAndDelete({ id });
  }
}
