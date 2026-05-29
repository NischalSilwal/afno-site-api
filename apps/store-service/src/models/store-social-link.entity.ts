import { AbstractEntity } from "@app/common/database/abstract.schema";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { Store } from "./store.entity";

@Entity()
export class StoreSocialLink extends AbstractEntity<StoreSocialLink> {
    @Column({ nullable: true })
    instagramLink: string;

    @Column({ nullable: true })
    tiktokLink: string;

    @Column({ nullable: true })
    facebookLink: string;

    @Column({ nullable: true })
    whatsappNumber: string;

    @OneToOne(() => Store, (store) => store.socialLinks)
    @JoinColumn()
    store: Store;
}
