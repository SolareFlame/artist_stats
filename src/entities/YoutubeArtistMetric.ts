import {
    Entity,
    Column,
} from "typeorm";

import {ArtistMetrics} from "./ArtistMetric";

@Entity()
export class YoutubeArtistMetrics extends ArtistMetrics {
    @Column({ type: "int" })
    subscribers!: number;

    @Column({ type: "bigint" })
    total_views!: number;

    @Column({ type: "int" })
    video_count!: number;
}
