import { Injectable } from '@nestjs/common';
import { StoreRepository } from './store/store.repository';
import { CreateStoreDto } from './store/dto/create-store.dto';
import { UpdateStoreDto } from './store/dto/update-store.dto';
import { Store } from './store/models/store.entity';
import { StoreSocialLink } from './store/models/store-social-link.entity';

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

    update(id: number, updateStoreDto: UpdateStoreDto) {
        return this.storeRepository.findOneAndUpdate({ id }, updateStoreDto);
    }

    remove(id: number) {
        return this.storeRepository.findOneAndDelete({ id });
    }
}
