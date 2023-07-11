import axios from "axios";

export async function getVideos() {
    try {
        const res = await axios.get('https://www.googleapis.com/youtube/v3/search',
            {
                params: {
                    part: 'snippet',
                    type: 'video',
                    maxResults: 25,
                    q: 'bts',
                    key: import.meta.env.VITE_REACT_APP_YOUTUBE_API_KEY,
                }
            })
        return res.data.items.map((item:YoutubeType) => ({...item, id:item.id.videoId}))
    } catch (error) {
        console.error()
    }
}

export async function fakeGetVideos() {
    try {
        const res = await axios.get('/videos/ht.json')
        return res.data.items.map((item:YoutubeType) => ({...item, id:item.id.videoId}))
    } catch(error) {
        console.error()
    }
}

interface YoutubeType {
    kind: string;
    etag: string;
    id: {
        kind: string;
        videoId: string;
        channelId: string;
        playlistId?: string;
        videoid?: string;
    };
    snippet: {
        publishedAt: Date;
        channelId: string;
        title: string;
        description: string;
        thumbnails: {
            [key: string]: {
                url: string;
                width: number;
                height: number;
            };
        };
        channelTitle: string;
    };
}