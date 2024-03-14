import TrendingShows from "@/components/home/TrendingShows";
import DetailCard from "@/components/shared/DetailCard";
import { TvDetailsProps } from "@/props/TvShowProps";
import React from "react";
import tvData from "../../../tvData";
import fetchDiscover from "@/libs/FetchDiscover";
import Pagination from "@/components/search/Pagination";
import CatalogList from "@/components/shared/CatalogList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tv Shows",
};

interface TvShowProps {
  searchParams: { page: number };
}

const TvShows: React.FC<TvShowProps> = async ({ searchParams }) => {
  const randomNumber = Math.floor(Math.random() * 5);
  const data = tvData[randomNumber];
  const { results, totalPages } = await fetchDiscover(
    "tv",
    searchParams.page ? searchParams.page : 1
  );

  const {
    id,
    adult,
    genres,
    backdrop_path,
    overview,
    name,
    tagline,
    first_air_date,
    last_air_date,
    number_of_episodes,
    number_of_seasons,
  } = data as TvDetailsProps;

  return (
    <main>
      <DetailCard
        id={id}
        adult={adult}
        backgroundImage={backdrop_path}
        genres={genres}
        overview={overview}
        releaseDate={first_air_date}
        tagLine={tagline}
        title={name}
        variant="tv"
      >
        {/* Additional info */}

        <span>
          {first_air_date.substring(0, 4)} - {last_air_date.substring(0, 4)}
        </span>
        <span> &#8226; </span>
        <span>{number_of_seasons} Seasons</span>
        <span> &#8226; </span>
        <span>{number_of_episodes} Episodes</span>
      </DetailCard>

      <section className="w-full h-[100vh] py-10 text-white">
        <TrendingShows />
      </section>

      <section className="text-white w-full min-h-[100svh]" id="discover">
        <h2 className="m-4 text-3xl font-semibold">Discover</h2>
        <CatalogList list={results} type="tv" />

        {/* {currentPage > 0 && ( */}
        <Pagination
          href={`/tv`}
          type={"tv"}
          totalPages={totalPages}
          currentPage={searchParams.page}
          scroll
        />
      </section>
    </main>
  );
};

export default TvShows;
