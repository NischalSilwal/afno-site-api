import { Expose, Type } from 'class-transformer';

class ProductVariantResponseDto {
  @Expose()
  name: string;

  @Expose()
  value: string;

  @Expose()
  priceModifier?: number;
}

/**
 * Data Transfer Object for product responses.
 * Ensures internal fields are not leaked.
 */
export class ProductResponseDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  image: string;

  @Expose()
  images: string[];

  @Expose()
  price: number;

  @Expose()
  category: string;

  @Expose()
  description: string;

  @Expose()
  @Type(() => ProductVariantResponseDto)
  variants: ProductVariantResponseDto[];

  @Expose()
  stockQuantity: number;

  @Expose()
  isFeatured: boolean;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
