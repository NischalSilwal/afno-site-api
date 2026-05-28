import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import type { Request } from 'express';
import { ProductServiceService } from './product-service.service';
import { CreateProductServiceDto } from './product-service/dto/create-product-service.dto';
import { UpdateProductServiceDto } from './product-service/dto/update-product-service.dto';

@Controller('products')
export class ProductServiceController {
  constructor(private readonly productServiceService: ProductServiceService) { }

  @Post()
  create(@Body() createProductServiceDto: CreateProductServiceDto) {
    return this.productServiceService.create(createProductServiceDto);
  }

  @Get()
  findAll() {
    return this.productServiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productServiceService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProductServiceDto: UpdateProductServiceDto) {
    return this.productServiceService.update(id, updateProductServiceDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productServiceService.remove(id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: join(process.cwd(), 'uploads', 'products'),
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
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    return { url: `/uploads/products/${file.filename}` };
  }
}
