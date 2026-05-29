import { AbstractEntity } from "@app/common/database/abstract.schema";
import { Column, Entity, OneToOne } from "typeorm";
import { StoreSocialLink } from "./store-social-link.entity";

@Entity()
export class Store extends AbstractEntity<Store> {
    @Column()
    storeName: string;

    @Column()
    logo: string;

    @Column({ nullable: true })
    banner: string;

    @OneToOne(() => StoreSocialLink, (storeSocialLink) => storeSocialLink.store, { cascade: true, eager: true })
    socialLinks: StoreSocialLink;
}
