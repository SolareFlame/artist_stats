import {
    Entity,
    Column, ManyToOne,
} from "typeorm";

import {TrackMetrics} from "./TrackMetrics";
import {SpotifyArtistMetrics} from "./SpotifyArtistMetrics";
import {YoutubeArtistMetrics} from "./YoutubeArtistMetrics";

@Entity()
export class YoutubeTrackMetrics extends TrackMetrics {
    @Column()
    album!: string;

    @Column({ type: "int" })
    views!: number;

    @Column({ type: "int" })
    likes!: number;

    @Column({ type: "int" })
    comments!: number;

    @ManyToOne(() => YoutubeArtistMetrics, artistMetrics => artistMetrics.tracks)
    artistMetrics!: YoutubeArtistMetrics;
}

