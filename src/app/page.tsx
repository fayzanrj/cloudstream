import TrendingMovies from "@/components/home/TrendingMovies";
import TrendingShows from "@/components/home/TrendingShows";
import { InboxArrowDownIcon, TvIcon } from "@heroicons/react/24/outline";
import tvData from "../../tvData";
import Link from "next/link";
import DetailCard from "@/components/shared/DetailCard";
import { TvDetailsProps } from "@/props/TvShowProps";

export default async function Home() {
  const randomNumber = Math.floor(Math.random() * 5);
  const data = tvData[randomNumber];

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
        <TrendingMovies />
        <TrendingShows />
      </section>
    </main>
  );
}
