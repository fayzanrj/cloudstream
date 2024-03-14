"use client";
import React, { useEffect } from "react";

interface WatchProps {
  params: { tmdbId: number };
  searchParams: { s: number; e: number };
}

const Watch: React.FC<WatchProps> = ({ params, searchParams }) => {
  useEffect(() => {
    var iframe = document.getElementById("iframe") as HTMLIFrameElement;

    if (iframe) {
      // Add an event listener to the iframe's content window
      iframe.addEventListener("", (event: BeforeUnloadEvent) => {
        // Prevent the default behavior (opening the popup)
        event.preventDefault();
        // Optionally, you can log or handle the attempt to open a popup
        alert("Popup prevented from iframe.");
      });
    }
    return () => {
      // iframe?.removeEventListener("be");
    };
  }, []);

  return (
    <iframe
      id="iframe"
      // src={`https://vidsrc.xyz/embed/movie?tmdb=${params.tmdbId}&sub_url=https%3A%2F%2Fvidsrc.me%2Fsample.srt&ds_langs=en`}
      src={` https://multiembed.mov/?video_id=${params.tmdbId}&tmdb=1&s=${searchParams.s}&e=${searchParams.e}`}
      width="1000"
      height="600"
      autoFocus
      allowFullScreen
      title="Embedded Movie"
      className="z-50 w-full h-dvh relative "
      onAbort={() => console.log("aborted")}
    ></iframe>
  );
};

export default Watch;
