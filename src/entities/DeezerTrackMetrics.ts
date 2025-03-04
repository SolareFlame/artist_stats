import {
    Entity,
    Column, ManyToOne,
} from "typeorm";

import {TrackMetrics} from "./TrackMetrics";
import {DeezerArtistMetrics} from "./DeezerArtistMetrics";

@Entity()
export class DeezerTrackMetrics extends TrackMetrics {
    @Column()
    album!: string;

    @Column()
    rank!: number;

    @ManyToOne(() => DeezerArtistMetrics, artistMetrics => artistMetrics.tracks)
    artistMetrics!: DeezerArtistMetrics;
}
