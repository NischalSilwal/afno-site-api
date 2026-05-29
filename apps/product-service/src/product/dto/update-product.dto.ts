import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

/**
 * Data Transfer Object for updating a product.
 * Extends CreateProductDto with all fields optional.
 */
export class UpdateProductDto extends PartialType(CreateProductDto) {}
