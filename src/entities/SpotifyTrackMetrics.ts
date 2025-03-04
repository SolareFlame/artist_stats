import {
    Entity,
    Column, ManyToOne,
} from "typeorm";

import {TrackMetrics} from "./TrackMetrics";
import {SpotifyArtistMetrics} from "./SpotifyArtistMetrics";

@Entity()
export class SpotifyTrackMetrics extends TrackMetrics {
    @Column()
    album!: string;

    @Column()
    popularity!: number;

    @ManyToOne(() => SpotifyArtistMetrics, artistMetrics => artistMetrics.tracks)
    artistMetrics!: SpotifyArtistMetrics;
}