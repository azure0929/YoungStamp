import { fakeGetVideos } from "@/Api/youtubeApi.ts";
import VideoCard from "./VideoCard.tsx";
import "@/Components/YouTube/Youtube.scss";
import { useEffect, useState } from "react";


export default function Youtube() {
  const [videos, setVideos] = useState([]);
  useEffect(
     () => {
      fakeGetVideos().then(res => setVideos(res));
    }, []
  );

  return (
    <section className={"container"}>
      {videos && (
        <ul className={"video-list"}>
          {videos.map((video: YoutubeType) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </ul>
      )}
    </section>
  );
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