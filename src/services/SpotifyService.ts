import 'dotenv/config';
import SpotifyWebApi from 'spotify-web-api-node';

import { SpotifyArtistMetrics } from "../entities/SpotifyArtistMetric";
import { SpotifyTrackMetrics } from "../entities/SpotifyTrackMetric";

const spotify_api = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

const getAccessToken = async (): Promise<void> => {
    const data = await spotify_api.clientCredentialsGrant();
    spotify_api.setAccessToken(data.body['access_token']);
};

export class SpotifyService {
    async insertDailyMetrics(artistName: string): Promise<void> {
        await getAccessToken();

        const artistSearch = await spotify_api.searchArtists(artistName);
        if (!artistSearch.body.artists || artistSearch.body.artists.items.length === 0) {
            throw new Error(`Aucun artiste trouvé pour ${artistName}`);
        }
        const artist = artistSearch.body.artists.items[0];

        const dailyArtist = new SpotifyArtistMetrics();
        dailyArtist.artist_id = artist.id;
        dailyArtist.artist_name = artist.name;
        dailyArtist.artist_popularity = artist.popularity;
        dailyArtist.followers = artist.followers.total;

        await dailyArtist.save();

        const topTracksData = await spotify_api.getArtistTopTracks(artist.id, 'US');
        const tracks = topTracksData.body.tracks;

        for (const track of tracks) {
            const dailyTrack = new SpotifyTrackMetrics();
            dailyTrack.track_id = track.id;
            dailyTrack.track_name = track.name;
            dailyTrack.album = track.album.name;
            dailyTrack.popularity = track.popularity;
            dailyTrack.artistMetrics = dailyArtist;
            await dailyTrack.save();
        }
    }
}
