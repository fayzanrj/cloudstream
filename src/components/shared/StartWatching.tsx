"use client";
import { TvIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

interface StartWatchingProps {
  variant: "movie" | "tv";
  tmdbId: number;
  season?: number;
  ep?: number;
}
const StartWatching: React.FC<StartWatchingProps> = ({
  variant,
  tmdbId,
  season,
  ep,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const openModal = () => setIsPlaying(true);
  return (
    <>
      {isPlaying && (
        <iframe
          // src={`https://vidsrc.xyz/embed/movie?tmdb=${params.tmdbId}&sub_url=https%3A%2F%2Fvidsrc.me%2Fsample.srt&ds_langs=en`}
          src={` https://multiembed.mov/?video_id=${tmdbId}&tmdb=1`}
          width="1000"
          height="600"
          frameBorder="0"
          allowFullScreen
          title="Embedded Movie"
          className="absolute top-0 left-0 z-50 w-full h-full"
          onAbort={() => console.log("aborted")}
        ></iframe>
      )}
      <button
        className="bg-[#a18aff] border-[#a18aff] border px-4 sm:px-8 py-1.5 sm:py-2.5 font-bold mx-2 rounded-lg sm:text-xl text-black"
        onClick={openModal}
      >
        <TvIcon className="h-5 sm:h-6 2-5 sm:w-6 inline-block" />
        <span className="align-middle ml-1 sm:ml-3">Start Watching</span>
      </button>
    </>
  );
};

export default StartWatching;
