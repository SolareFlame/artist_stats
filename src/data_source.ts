import "reflect-metadata";
import { DataSource } from "typeorm";
import 'dotenv/config';
import { SpotifyArtistMetrics } from "./entities/SpotifyArtistMetrics";
import { SpotifyTrackMetrics } from "./entities/SpotifyTrackMetrics";
import { DeezerArtistMetrics } from "./entities/DeezerArtistMetrics";
import { DeezerTrackMetrics } from "./entities/DeezerTrackMetrics";
import {YoutubeArtistMetrics} from "./entities/YoutubeArtistMetrics";
import {YoutubeTrackMetrics} from "./entities/YoutubeTrackMetrics";

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
        DeezerArtistMetrics,
        DeezerTrackMetrics,
        YoutubeArtistMetrics,
        YoutubeTrackMetrics,
    ],
});
