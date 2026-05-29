import { AbstractRepository } from "@app/common/database/abstract.repository";
import { Injectable } from "@nestjs/common";
import { Logger } from "nestjs-pino";
import { Product } from "./models/product.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";

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
