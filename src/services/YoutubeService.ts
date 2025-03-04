import axios from 'axios';
import { YoutubeArtistMetrics } from "../entities/YoutubeArtistMetrics";
import { YoutubeTrackMetrics } from "../entities/YoutubeTrackMetrics";

export class YoutubeService {
    async insertDailyMetrics(artistName: string): Promise<void> {
        const YT_API_KEY = process.env.YT_API_KEY;
        if (!YT_API_KEY) {
            throw new Error("Missing YT_API_KEY in environment variables");
        }

        const searchResponse = await axios.get("https://www.googleapis.com/youtube/v3/search", {
            params: {
                part: "snippet",
                q: artistName,
                type: "channel",
                maxResults: 1,
                key: YT_API_KEY,
            },
        });

        if (!searchResponse.data.items || searchResponse.data.items.length === 0) {
            throw new Error(`No channel found for ${artistName}`);
        }
        const channelItem = searchResponse.data.items[0];
        const channelId = channelItem.id.channelId;

        const channelResponse = await axios.get("https://www.googleapis.com/youtube/v3/channels", {
            params: {
                part: "snippet,statistics",
                id: channelId,
                key: YT_API_KEY,
            },
        });
        if (!channelResponse.data.items || channelResponse.data.items.length === 0) {
            throw new Error(`Channel details not found for id ${channelId}`);
        }
        const channelDetails = channelResponse.data.items[0];
        const snippet = channelDetails.snippet;
        const statistics = channelDetails.statistics;

        const youtubeArtist = new YoutubeArtistMetrics();
        youtubeArtist.artist_id = channelId;
        youtubeArtist.artist_name = snippet.title;
        youtubeArtist.subscribers = parseInt(statistics.subscriberCount, 10);
        youtubeArtist.total_views = parseInt(statistics.viewCount, 10);
        youtubeArtist.video_count = parseInt(statistics.videoCount, 10);
        await youtubeArtist.save();

        const videosResponse = await axios.get("https://www.googleapis.com/youtube/v3/search", {
            params: {
                part: "snippet",
                channelId: channelId,
                order: "viewCount",
                type: "video",
                maxResults: 10,
                key: YT_API_KEY,
            },
        });
        const videoItems = videosResponse.data.items;
        if (!videoItems || videoItems.length === 0) {
            console.log(`No videos found for channel ${artistName}`);
            return;
        }

        for (const videoItem of videoItems) {
            const videoId = videoItem.id.videoId;
            const videoResponse = await axios.get("https://www.googleapis.com/youtube/v3/videos", {
                params: {
                    part: "snippet,statistics",
                    id: videoId,
                    key: YT_API_KEY,
                },
            });
            if (!videoResponse.data.items || videoResponse.data.items.length === 0) {
                continue;
            }
            const videoDetails = videoResponse.data.items[0];
            const videoSnippet = videoDetails.snippet;
            const videoStats = videoDetails.statistics;

            const youtubeTrack = new YoutubeTrackMetrics();
            youtubeTrack.track_id = videoId;
            youtubeTrack.track_name = videoSnippet.title;
            youtubeTrack.album = videoSnippet.channelTitle;
            youtubeTrack.views = parseInt(videoStats.viewCount, 10);
            youtubeTrack.likes = parseInt(videoStats.likeCount || "0", 10);
            youtubeTrack.comments = parseInt(videoStats.commentCount || "0", 10);
            youtubeTrack.artistMetrics = youtubeArtist;

            await youtubeTrack.save();
        }
    }
}

