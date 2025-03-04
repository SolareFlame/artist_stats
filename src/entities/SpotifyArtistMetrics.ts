import {
    Entity,
    Column, OneToMany,
} from "typeorm";

import {ArtistMetrics} from "./ArtistMetrics";
import {SpotifyTrackMetrics} from "./SpotifyTrackMetrics";

@Entity()
export class SpotifyArtistMetrics extends ArtistMetrics {

    @Column()
    artist_popularity!: number;

    @OneToMany(() => SpotifyTrackMetrics, track => track.artistMetrics, { cascade: true })
    tracks!: SpotifyTrackMetrics[];
}
