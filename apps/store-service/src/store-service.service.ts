import { Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from './models/store.entity';
import { StoreSocialLink } from './models/store-social-link.entity';
import { StoreRepository } from './store.repository';

/**
 * Orchestrates store CRUD operations.
 * Maps DTOs to entity instances and delegates persistence to StoreRepository.
 * Social links are managed as a separate entity with a OneToOne relation
 * to avoid nullable columns cluttering the main store record.
 */
@Injectable()
export class StoreServiceService {
    constructor(private readonly storeRepository: StoreRepository) { }

    create(createStoreDto: CreateStoreDto) {
        const storeSocialLink = createStoreDto.socialLinks
            ? new StoreSocialLink(createStoreDto.socialLinks)
            : undefined;
        const store = new Store({ ...createStoreDto, socialLinks: storeSocialLink });
        return this.storeRepository.create(store);
    }

    findAll() {
        return this.storeRepository.find({});
    }

    findOne(id: number) {
        return this.storeRepository.findOne({ id });
    }

    async update(id: number, updateStoreDto: UpdateStoreDto) {
        const store = await this.storeRepository.findOne({ id });

        if (updateStoreDto.storeName !== undefined) store.storeName = updateStoreDto.storeName;
        if (updateStoreDto.logo !== undefined) store.logo = updateStoreDto.logo;
        if (updateStoreDto.banner !== undefined) store.banner = updateStoreDto.banner;

        // Merge social links rather than replacing — preserves existing links when only
        // a subset is sent in the update payload. Creates a new relation if one doesn't exist.
        if (updateStoreDto.socialLinks !== undefined) {
            if (store.socialLinks) {
                Object.assign(store.socialLinks, updateStoreDto.socialLinks);
            } else {
                store.socialLinks = new StoreSocialLink(updateStoreDto.socialLinks);
            }
        }

        return this.storeRepository.create(store);
    }

    remove(id: number) {
        return this.storeRepository.findOneAndDelete({ id });
    }
}
