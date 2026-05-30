import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateStoreSocialLinkDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    instagramLink?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    tiktokLink?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    facebookLink?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    whatsappNumber?: string;
}
