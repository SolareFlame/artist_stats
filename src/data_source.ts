import "reflect-metadata";
import { DataSource } from "typeorm";
import 'dotenv/config';
import { SpotifyArtistMetrics } from "./entities/SpotifyArtistMetric";
import { SpotifyTrackMetrics } from "./entities/SpotifyTrackMetric";
//import { DeezerArtistMetrics } from "./entities/DeezerArtistMetric";
//import { DeezerTrackMetrics } from "./entities/DeezerTrackMetric";
import {YoutubeArtistMetrics} from "./entities/YoutubeArtistMetric";
import {YoutubeTrackMetrics} from "./entities/YoutubeTrackMetric";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306'),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [
        SpotifyArtistMetrics,
        SpotifyTrackMetrics,
        //DeezerArtistMetrics,
        //DeezerTrackMetrics,
        YoutubeArtistMetrics,
        YoutubeTrackMetrics,
    ],
});
