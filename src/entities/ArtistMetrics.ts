import {
    Entity,
    PrimaryColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    BaseEntity
} from "typeorm";
import {TrackMetrics} from "./TrackMetrics";

/**
 * @class ArtistMetrics
 *
 * @description
 * - PK: artist_id, record_date
 * - artist_name
 * - subscribers
 * - tracks[]
 */

@Entity()
export abstract class ArtistMetrics extends BaseEntity {
    @PrimaryColumn({ type: "varchar", length: 50 })
    artist_id!: string;

    @PrimaryColumn({ type: "timestamp" })
    @CreateDateColumn({ type: "timestamp" })
    record_date!: Date;

    @Column()
    artist_name!: string;

    @Column({ type: "int" })
    subscribers!: number;

    @OneToMany(() => TrackMetrics, track => track.artistMetrics, { cascade: true })
    tracks!: TrackMetrics[];
}
