
import VideoCard from "./VideoCard.tsx";
import "@/Components/YouTube/youtube.scss";
import { useEffect, useState } from "react";
import { fakeGetVideos } from "@/Api/youtubeApi.ts";


export default function Youtube() {
  const [videos, setVideos] = useState<YoutubeType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fakeGetVideos()
      .then((res: YoutubeType[]) => {
        setVideos(res);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className={"container"}>
      {videos.length > 0 && (
        <ul className={"video-list"}>
          {videos.map((video: YoutubeType) => (
            <VideoCard key={video.videoId} video={video} />
          ))}
        </ul>
      )}
    </section>
  );
}

