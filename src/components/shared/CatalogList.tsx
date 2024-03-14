import { MovieProps } from "@/props/MovieProps";
import { TvShowProps } from "@/props/TvShowProps";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Pagination from "../search/Pagination";

interface CatalogListProps {
  list: (MovieProps | TvShowProps)[];
  type: "movie" | "tv";
}

const CatalogList: React.FC<CatalogListProps> = ({ list, type }) => {
  // Type guard to check if an object is of type MovieProps
  const isMovie = (list: MovieProps | TvShowProps): list is MovieProps => {
    return (list as MovieProps).title !== undefined;
  };
  return (
    <div className="flex gap-3 sm:gap-10 justify-center flex-wrap mt-10 mb-24 min-h-[50vh]">
      {list?.map((item, index) => {
        return (
          <Link
            href={`/${type === "movie" ? "movies" : "tv"}/${item.id}`}
            key={item.id}
            className="max-w-[37vw] sm:max-w-40 sm:max-h-fit break-words"
          >
            <Image
              src={process.env.NEXT_PUBLIC_TMDB_IMAGE_URL + item.poster_path}
              width={999}
              height={999}
              alt="image"
              loading="eager"
              className="w-[38vw] h-[55vw] sm:w-44 sm:h-60 aspect-auto object-cover"
            />
            <h3 className="w-full sm:text-lg my-2">
              {isMovie(item) ? item.title : (item as TvShowProps).name}{" "}
              <span className="text-[1rem]">
                (
                {isMovie(item)
                  ? item.release_date.substring(0, 4)
                  : (item as TvShowProps).first_air_date.substring(0, 4)}
                )
              </span>
            </h3>
          </Link>
        );
      })}
    </div>
  );
};

export default CatalogList;
