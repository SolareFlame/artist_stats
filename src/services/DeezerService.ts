import axios from 'axios';
import { DeezerArtistMetrics } from "../entities/DeezerArtistMetrics";
import { DeezerTrackMetrics } from "../entities/DeezerTrackMetrics";

export class DeezerService {
    async insertDailyMetrics(artistName: string): Promise<void> {
        const searchResponse = await axios.get("https://api.deezer.com/search/artist", {
            params: { q: artistName }
        });
        if (!searchResponse.data.data || searchResponse.data.data.length === 0) {
            throw new Error(`No artist found for ${artistName}`);
        }
        const artist = searchResponse.data.data[0];

        const artistResponse = await axios.get(`https://api.deezer.com/artist/${artist.id}`);
        const artistDetails = artistResponse.data;

        const deezerArtist = new DeezerArtistMetrics();
        deezerArtist.artist_id = artistDetails.id.toString();
        deezerArtist.artist_name = artistDetails.name;
        deezerArtist.subscribers = artistDetails.nb_fan;

        await deezerArtist.save();

        const topTracksResponse = await axios.get(`https://api.deezer.com/artist/${artist.id}/top`, {
            params: { limit: 10 }
        });
        const tracks = topTracksResponse.data.data;
        for (const track of tracks) {
            const deezerTrack = new DeezerTrackMetrics();
            deezerTrack.track_id = track.id.toString();
            deezerTrack.track_name = track.title;
            deezerTrack.album = track.album ? track.album.title : "";
            deezerTrack.rank = track.rank;

            deezerTrack.artistMetrics = deezerArtist;
            await deezerTrack.save();
        }
    }
}

