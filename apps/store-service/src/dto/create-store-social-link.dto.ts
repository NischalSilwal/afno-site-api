import { IsOptional, IsString } from 'class-validator';

export class CreateStoreSocialLinkDto {
    @IsOptional()
    @IsString()
    instagramLink?: string;

    @IsOptional()
    @IsString()
    tiktokLink?: string;

    @IsOptional()
    @IsString()
    facebookLink?: string;

    @IsOptional()
    @IsString()
    whatsappNumber?: string;
}
