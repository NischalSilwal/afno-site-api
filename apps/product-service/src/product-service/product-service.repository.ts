import { AbstractRepository } from "@app/common/database/abstract.repository";
import { Injectable, Logger } from "@nestjs/common";
import { Product } from "./models/product.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";

@Injectable()
export class ProductRepository extends AbstractRepository<Product> {
    protected readonly logger = new Logger(ProductRepository.name);
    constructor(
        @InjectRepository(Product)
        productRepository: Repository<Product>,
        entityManager: EntityManager,
    ) {
        super(productRepository, entityManager);
    }
}
