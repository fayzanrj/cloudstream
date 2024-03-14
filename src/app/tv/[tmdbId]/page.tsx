import DetailCard from "@/components/shared/DetailCard";
import fetchDetails from "@/libs/FetchMovieDetails";
import { TvDetailsProps } from "@/props/TvShowProps";
import React from "react";

interface TvDetailsPageProps {
  params: { tmdbId: number };
}
const TvDetails: React.FC<TvDetailsPageProps> = async ({ params }) => {
  const data = await fetchDetails("tv", params.tmdbId);

  if (data === undefined) {
    return <div>Error</div>;
  }
  const {
    id,
    adult,
    genres,
    backdrop_path,
    overview,
    name,
    tagline,
    first_air_date,
    number_of_episodes,
    number_of_seasons,
    last_air_date,
  } = data as TvDetailsProps;

  return (
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
  );
};

export default TvDetails;
