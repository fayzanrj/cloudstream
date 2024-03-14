"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { document } from "postcss";
import React, { useRef } from "react";

interface ListLayoutProps {
  heading: "Movies" | "Shows";
  children: React.ReactNode;
}
const ListLayout: React.FC<ListLayoutProps> = ({ heading, children }) => {
  const moviesRef = useRef<HTMLDivElement>(null);
  const showsRef = useRef<HTMLDivElement>(null);
  //   const [scrol]

  const scrollLeft = () => {
    if (heading === "Movies") {
      if (moviesRef.current) {
        moviesRef.current.scrollLeft -= 200; // Adjust the scrolling distance as needed
      }
    } else {
      if (showsRef.current) {
        showsRef.current.scrollLeft -= 200; // Adjust the scrolling distance as needed
      }
    }
  };

  const scrollRight = () => {
    if (heading === "Movies") {
      if (moviesRef.current) {
        moviesRef.current.scrollLeft += 200; // Adjust the scrolling distance as needed
      }
    } else {
      if (showsRef.current) {
        showsRef.current.scrollLeft += 200; // Adjust the scrolling distance as needed
      }
    }
  };

  return (
    <div className="relative my-2">
      <h2 className="m-4 text-3xl font-semibold">Trending {heading}</h2>
      <button
        onClick={scrollLeft}
        className="absolute left-5 top-1/3 z-50 transform translate-y-1/2 bg-gray-200 rounded-full p-2"
      >
        <ChevronLeftIcon className="h-4 w-4 md:h-6 md:w-6 text-gray-700" />
      </button>

      <div
        ref={heading === "Movies" ? moviesRef : showsRef}
        id="trendingMoviesContainer"
        className="w-full overflow-x-scroll flex gap-2 px-20 relative scroll-smooth NO_SCROLLBAR"
      >
        {children}
      </div>

      <button
        onClick={scrollRight}
        className="absolute right-5 top-1/3 transform z-50 translate-y-1/2 bg-gray-200 rounded-full p-2"
      >
        <ChevronRightIcon className="h-4 w-4 md:h-6 md:w-6 text-gray-700" />
      </button>
    </div>
  );
};

export default ListLayout;
