import { AbstractEntity } from "@app/common/database/abstract.schema";
import { Column, Entity } from "typeorm";

@Entity()
export class Product extends AbstractEntity<Product> {
    @Column()
    title: string;

    @Column({ nullable: true })
    image: string;

    @Column('jsonb', { default: [] })
    images: string[];

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column()
    category: string;

    @Column({ nullable: true })
    description: string;

    @Column('jsonb', { default: [] })
    variants: { name: string; value: string; priceModifier?: number }[];

    @Column({ default: 0 })
    stockQuantity: number;

    @Column({ default: false })
    isFeatured: boolean;
}
