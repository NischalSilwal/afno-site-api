import { Injectable } from '@nestjs/common';
import { CreateProductServiceDto } from './dto/create-product-service.dto';
import { UpdateProductServiceDto } from './dto/update-product-service.dto';

@Injectable()
export class ProductService {
  create(createProductServiceDto: CreateProductServiceDto) {
    return 'This action adds a new productService';
  }

  findAll() {
    return `This action returns all productService`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productService`;
  }

  update(id: number, updateProductServiceDto: UpdateProductServiceDto) {
    return `This action updates a #${id} productService`;
  }

  remove(id: number) {
    return `This action removes a #${id} productService`;
  }
}
