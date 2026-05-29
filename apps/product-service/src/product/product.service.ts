import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './product.repository';
import { Product } from './entities/product.entity';

/**
 * Orchestrates product CRUD operations.
 * Delegates persistence to ProductRepository.
 */
@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  /**
   * Creates a new product.
   */
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = new Product(createProductDto);
    return this.productRepository.create(product);
  }

  /**
   * Retrieves all products.
   */
  async findAll(): Promise<Product[]> {
    return this.productRepository.find({});
  }

  /**
   * Retrieves a single product by ID.
   */
  async findOne(id: string): Promise<Product> {
    try {
      return await this.productRepository.findOne({ id } as any);
    } catch (error) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }

  /**
   * Updates an existing product.
   */
  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    try {
      return await this.productRepository.findOneAndUpdate(
        { id } as any,
        updateProductDto,
      );
    } catch (error) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }

  /**
   * Removes a product by ID.
   */
  async remove(id: string): Promise<void> {
    return this.productRepository.findOneAndDelete({ id } as any);
  }
}
