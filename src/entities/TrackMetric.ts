import {
    Entity,
    PrimaryColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    BaseEntity
} from "typeorm";
import { ArtistMetrics } from "./ArtistMetric";

/**
 * @class TrackMetrics
 *
 * @description
 * - PK: track_id, record_date
 * - track_name
 */

@Entity()
export abstract class TrackMetrics extends BaseEntity {
    @PrimaryColumn({ type: "varchar", length: 50 })
    track_id!: string;

    @PrimaryColumn({ type: "timestamp" })
    @CreateDateColumn({ type: "timestamp" })
    record_date!: Date;

    @Column()
    track_name!: string;

    @ManyToOne(() => ArtistMetrics, artistMetrics => artistMetrics.tracks)
    artistMetrics!: ArtistMetrics;
}

