"use client";
import React, { useState } from "react";

interface WatchProps {
  params: { tmdbId: number };
}

const Watch: React.FC<WatchProps> = ({ params }) => {
  const [player, setPlayer] = useState<1 | 2>(1);

  return (
    <div className="w-full px-2 py-10">
      <div className="m-8 text-center">
        <button
          onClick={() => setPlayer(1)}
          className={`rounded-md py-1.5 px-3 text-white mx-1 ${
            player === 1 && "bg-gray-800"
          }`}
        >
          Player 1
        </button>
        <button
          onClick={() => setPlayer(2)}
          className={`rounded-md py-1.5 px-3 text-white mx-1 ${
            player === 2 && "bg-gray-800"
          }`}
        >
          Player 2
        </button>
      </div>
      <iframe
        // src={`https://vidsrc.xyz/embed/movie?tmdb=${params.tmdbId}&sub_url=https%3A%2F%2Fvidsrc.me%2Fsample.srt&ds_langs=en`}
        src={
          player === 1
            ? `https://multiembed.mov/?video_id=${params.tmdbId}&tmdb=1`
            : `https://vidsrc.to/embed/movie/${params.tmdbId}`
        }
        width="1000"
        height="600"
        autoFocus
        allowFullScreen
        title="Embedded Movie"
        className="z-50 w-[98%] md:w-8/12 h-[60vw] md:h-[36vw]  mx-auto"
      ></iframe>
    </div>
  );
};

export default Watch;
