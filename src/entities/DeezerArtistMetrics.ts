import {
    Entity,
    Column, OneToMany,
} from "typeorm";

import {ArtistMetrics} from "./ArtistMetrics";
import {DeezerTrackMetrics} from "./DeezerTrackMetrics";

@Entity()
export class DeezerArtistMetrics extends ArtistMetrics {

    @OneToMany(() => DeezerTrackMetrics, track => track.artistMetrics, { cascade: true })
    tracks!: DeezerTrackMetrics[];
}
