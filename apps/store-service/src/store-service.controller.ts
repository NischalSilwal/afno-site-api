import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import type { Request } from 'express';
import { StoreServiceService } from './store-service.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { ImageProcessingService } from '@app/image-processing';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('stores')
@Controller('stores')
export class StoreServiceController {
    constructor(
        private readonly storeServiceService: StoreServiceService,
        private readonly imageProcessingService: ImageProcessingService,
    ) { }

    @Post()
    create(@Body() createStoreDto: CreateStoreDto) {
        return this.storeServiceService.create(createStoreDto);
    }

    @Get()
    findAll() {
        return this.storeServiceService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.storeServiceService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateStoreDto: UpdateStoreDto) {
        return this.storeServiceService.update(id, updateStoreDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.storeServiceService.remove(id);
    }

    @Post('upload/logo')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            // Save logos under uploads/stores/logos/ with a timestamp to avoid name collisions
            destination: join(process.cwd(), 'uploads', 'stores', 'logos'),
            filename: (_req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                cb(null, uniqueSuffix + extname(file.originalname));
            },
        }),
        // Reject non-image uploads at the Multer level before the handler runs
        fileFilter: (_req: Request, file: Express.Multer.File, cb: (error: Error | null, acceptFile: boolean) => void) => {
            if (!file.mimetype.match(/^image\//)) {
                return cb(new BadRequestException('Only image files are allowed!'), false);
            }
            cb(null, true);
        },
        limits: { fileSize: 5 * 1024 * 1024 },
    }))
    async uploadLogo(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException('No file uploaded');
        }
        // Compress the uploaded logo to reduce storage and bandwidth
        await this.imageProcessingService.compress({ filePath: file.path });
        return { url: `/uploads/stores/logos/${file.filename}` };
    }

    @Post('upload/banner')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: join(process.cwd(), 'uploads', 'stores', 'banners'),
            filename: (_req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                cb(null, uniqueSuffix + extname(file.originalname));
            },
        }),
        fileFilter: (_req: Request, file: Express.Multer.File, cb: (error: Error | null, acceptFile: boolean) => void) => {
            if (!file.mimetype.match(/^image\//)) {
                return cb(new BadRequestException('Only image files are allowed!'), false);
            }
            cb(null, true);
        },
        limits: { fileSize: 5 * 1024 * 1024 },
    }))
    async uploadBanner(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException('No file uploaded');
        }
        await this.imageProcessingService.compress({ filePath: file.path });
        return { url: `/uploads/stores/banners/${file.filename}` };
    }
}
