import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    BaseEntity
} from "typeorm";
import { SpotifyTrackMetrics } from "./SpotifyTrackMetric";

@Entity()
export class SpotifyArtistMetrics extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    artist_id!: string;

    @Column()
    artist_name!: string;

    @Column()
    artist_popularity!: number;

    @Column()
    followers!: number;

    @CreateDateColumn({ type: "timestamp" })
    record_date!: Date;

    @OneToMany(() => SpotifyTrackMetrics, track => track.artistMetrics, { cascade: true })
    tracks!: SpotifyTrackMetrics[];
}
