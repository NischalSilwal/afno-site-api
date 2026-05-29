import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateStoreSocialLinkDto } from './create-store-social-link.dto';

export class CreateStoreDto {
    @IsString()
    storeName: string;

    @IsString()
    logo: string;

    @IsOptional()
    @IsString()
    banner?: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => CreateStoreSocialLinkDto)
    socialLinks?: CreateStoreSocialLinkDto;
}
