import { formatAgo } from "./FormatAgo.ts";
import { useState } from "react";
import VideoDetail from "@/Components/YouTube/VideoDetail.tsx";
import Modal from "@/Components/Modal/Modal.tsx";

export default function({ video }) {
  const { title, thumbnails, channelTitle, publishedAt } = video.snippet;
  const [visibility, setVisibility] = useState(false);
  const handleClick = () => {
    // 모달안에서 videodetail 콤퍼넌트에 video 보내주기
    setVisibility(true);
  };

  return (
    <>
      <li>
        <img
          className={"thumbnail"}
          onClick={handleClick}
          src={thumbnails.medium.url} alt={title} />
        <div>
          <p>{title}</p>
          <p>{channelTitle}</p>
          <p>{formatAgo(publishedAt, "ko")}</p>
        </div>
      </li>
    </>


  );
}

