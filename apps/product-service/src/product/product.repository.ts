import { AbstractRepository } from '@app/common/database/abstract.repository';
import { Injectable } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

/**
 * Repository for Product entity.
 * Extends AbstractRepository to provide generic CRUD operations.
 */
@Injectable()
export class ProductRepository extends AbstractRepository<Product> {
  constructor(
    @InjectRepository(Product)
    productRepository: Repository<Product>,
    entityManager: EntityManager,
    logger: Logger,
  ) {
    super(productRepository, entityManager, logger);
  }
}
