import { Logger, NotFoundException } from '@nestjs/common';
import { AbstractEntity } from './abstract.schema';
import { EntityManager, FindOptionsWhere, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class AbstractRepository<TEntity extends AbstractEntity<TEntity>> {
    protected abstract readonly logger: Logger;

    constructor(
        protected readonly repository: Repository<TEntity>,
        protected readonly entityManager: EntityManager,
    ) { }

    async create(entity: TEntity): Promise<TEntity> {
        return this.entityManager.save(entity);
    }

    async findOne(where: FindOptionsWhere<TEntity>): Promise<TEntity> {
        const entity = await this.repository.findOne({ where });

        if (!entity) {
            this.logger.warn('Entity was not found with where', where);
            throw new NotFoundException('Entity was not found');
        }

        return entity;
    }

    async findOneAndUpdate(
        where: FindOptionsWhere<TEntity>,
        update: QueryDeepPartialEntity<TEntity>,
    ): Promise<TEntity> {
        const updateResult = await this.repository.update(where, update);

        if (!updateResult.affected) {
            this.logger.warn('Entity was not found with where', where);
            throw new NotFoundException('Entity was not found');
        }

        return this.findOne(where);
    }

    async find(where: FindOptionsWhere<TEntity>): Promise<TEntity[]> {
        return this.repository.find({ where });
    }

    async findOneAndDelete(where: FindOptionsWhere<TEntity>): Promise<void> {
        await this.repository.delete(where);
    }
}
