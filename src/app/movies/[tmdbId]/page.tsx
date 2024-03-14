import DetailCard from "@/components/shared/DetailCard";
import fetchDetails from "@/libs/FetchMovieDetails";
import React from "react";
import { MovieDetailsProps } from "@/props/MovieProps";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Movies",
};
interface MovieDetailsPageProps {
  params: { tmdbId: number };
}
const MovieDetails: React.FC<MovieDetailsPageProps> = async ({ params }) => {
  const data = await fetchDetails("movie", params.tmdbId);

  if (data === undefined) {
    return <div>Error</div>;
  }

  const {
    id,
    adult,
    backdrop_path,
    genres,
    title,
    overview,
    poster_path,
    release_date,
    tagline,
    runtime,
  } = data as MovieDetailsProps;

  return (
    <main>
      <DetailCard
        id={id}
        adult={adult}
        backgroundImage={backdrop_path}
        genres={genres}
        overview={overview}
        releaseDate={release_date}
        tagLine={tagline}
        title={title}
        variant="movie"
      >
        <span>
          {Math.floor(runtime / 60)} hours {runtime % 60} minutes
        </span>
      </DetailCard>
    </main>
  );
};

export default MovieDetails;
