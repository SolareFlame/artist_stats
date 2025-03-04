import {
    Entity,
    Column,
} from "typeorm";

import {TrackMetrics} from "./TrackMetric";

@Entity()
export class SpotifyTrackMetrics extends TrackMetrics {
    @Column()
    album!: string;

    @Column()
    popularity!: number;
}