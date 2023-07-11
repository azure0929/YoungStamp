import {fakeGetVideos} from "../../Api/youtubeApi.ts";
import {useQuery} from "@tanstack/react-query";
import VideoCard from "./VideoCard.tsx";
import '@/Components/YouTube/Youtube.scss'


export default function Youtube() {
    const {isLoading, error, data: videos} =
        useQuery(['videos'], () => fakeGetVideos(), {staleTime: 1000 * 60 });

    return (
        <section className={'container'}>
            {isLoading && <p>Loading ....</p>}
            {error && console.error(error)}
            {videos && (
                <ul className={'video-list'}>
                    {videos.map((video:YoutubeType) => (
                       <VideoCard key={video.id} video={video} />
                    ))}
                </ul>
            )}
        </section>
    )
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