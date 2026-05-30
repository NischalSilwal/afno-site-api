import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateStoreSocialLinkDto } from './create-store-social-link.dto';

export class CreateStoreDto {
    @ApiProperty()
    @IsString()
    storeName: string;

    @ApiProperty()
    @IsString()
    logo: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    banner?: string;

    @ApiPropertyOptional({ type: CreateStoreSocialLinkDto })
    @IsOptional()
    @ValidateNested()
    @Type(() => CreateStoreSocialLinkDto)
    socialLinks?: CreateStoreSocialLinkDto;
}
