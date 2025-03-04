import {
    Entity,
    Column,
} from "typeorm";

import {TrackMetrics} from "./TrackMetric";

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
}

