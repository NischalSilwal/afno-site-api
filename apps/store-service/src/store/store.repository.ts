import { AbstractRepository } from "@app/common/database/abstract.repository";
import { Injectable } from "@nestjs/common";
import { Logger } from "nestjs-pino";
import { Store } from "./models/store.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";

@Injectable()
export class StoreRepository extends AbstractRepository<Store> {
    constructor(
        @InjectRepository(Store)
        storeRepository: Repository<Store>,
        entityManager: EntityManager,
        logger: Logger,
    ) {
        super(storeRepository, entityManager, logger);
    }
}
