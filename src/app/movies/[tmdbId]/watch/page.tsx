"use client";
import React from "react";

interface WatchProps {
  params: { tmdbId: number };
}

const Watch: React.FC<WatchProps> = ({ params }) => {
  return (
    <iframe
      // src={`https://vidsrc.xyz/embed/movie?tmdb=${params.tmdbId}&sub_url=https%3A%2F%2Fvidsrc.me%2Fsample.srt&ds_langs=en`}
      src={` https://multiembed.mov/?video_id=${params.tmdbId}&tmdb=1`}
      width="1000"
      height="600"
      frameBorder="0"
      allowFullScreen
      title="Embedded Movie"
      className="absolute top-0 left-0 z-50 w-full h-full"
      onAbort={() => console.log("aborted")}
    ></iframe>
  );
};

export default Watch;
