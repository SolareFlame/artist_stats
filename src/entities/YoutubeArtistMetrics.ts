import {
    Entity,
    Column, OneToMany,
} from "typeorm";

import {ArtistMetrics} from "./ArtistMetrics";
import {YoutubeTrackMetrics} from "./YoutubeTrackMetrics";


@Entity()
export class YoutubeArtistMetrics extends ArtistMetrics {
    @Column({ type: "int" })
    subscribers!: number;

    @Column({ type: "bigint" })
    total_views!: number;

    @Column({ type: "int" })
    video_count!: number;

    @OneToMany(() => YoutubeTrackMetrics, track => track.artistMetrics, { cascade: true })
    tracks!: YoutubeTrackMetrics[];
}
