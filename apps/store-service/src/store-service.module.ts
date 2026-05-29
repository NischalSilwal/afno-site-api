import { Module } from '@nestjs/common';
import { StoreServiceController } from './store-service.controller';
import { StoreServiceService } from './store-service.service';
import { DatabaseModule, LoggerModule } from '@app/common';
import { ImageProcessingModule } from '@app/image-processing';
import { Store } from './models/store.entity';
import { StoreSocialLink } from './models/store-social-link.entity';
import { StoreRepository } from './store.repository';


@Module({
    imports: [
        LoggerModule,
        DatabaseModule,
        DatabaseModule.forFeature([Store, StoreSocialLink]),
        ImageProcessingModule,
    ],
    controllers: [StoreServiceController],
    providers: [StoreServiceService, StoreRepository],
})
export class StoreServiceModule { }
