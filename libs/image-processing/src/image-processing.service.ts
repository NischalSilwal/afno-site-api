import { Injectable } from '@nestjs/common';
import sharp from 'sharp';
import { CompressOptions } from './interfaces/compress-options.interface';
import { extname } from 'path';

@Injectable()
export class ImageProcessingService {
    async compress(options: CompressOptions): Promise<string> {
        const outputPath = options.outputPath ?? options.filePath;
        const quality = options.quality ?? 80;
        const extension = extname(outputPath).toLowerCase();

        let pipeline = sharp(options.filePath);

        if (options.width || options.height) {
            pipeline = pipeline.resize(options.width, options.height, {
                fit: 'inside',
                withoutEnlargement: true,
            });
        }

        if (extension === '.jpg' || extension === '.jpeg') {
            pipeline = pipeline.jpeg({ quality });
        } else if (extension === '.png') {
            pipeline = pipeline.png({ quality });
        } else if (extension === '.webp') {
            pipeline = pipeline.webp({ quality });
        }

        await pipeline.toFile(outputPath);
        return outputPath;
    }
}
