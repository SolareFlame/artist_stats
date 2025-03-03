import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    BaseEntity, PrimaryColumn
} from "typeorm";
import {SpotifyArtistMetrics} from "./SpotifyArtistMetric";

@Entity()
export class SpotifyTrackMetrics extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    track_id!: string;

    @Column()
    track_name!: string;

    @Column()
    album!: string;

    @Column()
    popularity!: number;

    @ManyToOne(() => SpotifyArtistMetrics, artistMetrics => artistMetrics.tracks)
    artistMetrics!: SpotifyArtistMetrics;
}