import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product-service.service';
import { CreateProductServiceDto } from './dto/create-product-service.dto';
import { UpdateProductServiceDto } from './dto/update-product-service.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('product-service')
@Controller('product-service')
export class ProductServiceController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  create(@Body() createProductServiceDto: CreateProductServiceDto) {
    return this.productService.create(createProductServiceDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductServiceDto: UpdateProductServiceDto) {
    return this.productService.update(+id, updateProductServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
