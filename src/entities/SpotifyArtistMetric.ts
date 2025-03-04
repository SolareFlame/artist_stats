import {
    Entity,
    Column,
} from "typeorm";

import {ArtistMetrics} from "./ArtistMetric";

@Entity()
export class SpotifyArtistMetrics extends ArtistMetrics {

    @Column()
    artist_popularity!: number;
}
