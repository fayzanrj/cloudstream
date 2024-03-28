"use client";
import { EpisodeProps, TvDetailsProps } from "@/props/TvShowProps";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loader from "../Loader";

interface WatchProps {
  tmdbId: number;
  tvDetails: TvDetailsProps;
}

const Episodes: React.FC<WatchProps> = ({ tmdbId, tvDetails }) => {
  const searchParams = useSearchParams();
  const [episodes, setEpisodes] = useState<EpisodeProps[]>([]);
  const [showDetails, setShowDetails] = useState<TvDetailsProps>(tvDetails);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const seasonFromLink = searchParams.get("s");
  const epFromLink = searchParams.get("e");
  const parsedSeason = seasonFromLink !== null ? parseInt(seasonFromLink) : 1;
  const parsedEpisode = epFromLink !== null ? parseInt(epFromLink) : 1;
  const [seasonEpisode, setSeasonEpisode] = useState<{
    season: number;
    episode: number;
  }>({
    season: Number.isInteger(parsedSeason) ? parsedSeason : 1,
    episode: Number.isInteger(parsedEpisode) ? parsedEpisode : 1,
  });

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_TMDB_API_URL}/tv/${tmdbId}/season/${seasonEpisode.season}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        const data = await response.json();
        setEpisodes(data.episodes as EpisodeProps[]);
        console.log(data.episodes);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchEpisodes();
  }, [tmdbId, seasonEpisode.season]);

  const handleSeasonChange = (item: number) => {
    setSeasonEpisode({ ...seasonEpisode, season: item, episode: 1 });
  };

  const handleEpisodeChange = (item: number) => {
    setSeasonEpisode({ ...seasonEpisode, episode: item });
  };

  return (
    <div className="w-full min-h-[100vh] text-white px-2 py-10" id="episodes">
      <section>
        <h2 className="text-4xl font-semibold my-6">Seasons</h2>
        <div className="flex flex-wrap gap-2 px-4">
          {showDetails &&
            Array.from(
              { length: showDetails?.number_of_seasons || 6 },
              (_, index) => index + 1
            ).map((item) => (
              <Link
                key={item}
                onClick={() => handleSeasonChange(item)}
                href={`/tv/${tmdbId}/watch?s=${item}&e=${1}`}
              >
                <button
                  className={`py-2 text-2xl px-4  text-white ${
                    seasonEpisode.season === item
                      ? "bg-stone-600"
                      : "bg-transparent"
                  }`}
                >
                  {item}
                </button>
              </Link>
            ))}
        </div>
      </section>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="mt-10">
          <h2 className="text-4xl font-semibold my-6">Episodes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 relative px-4">
            {episodes.map((ep) => {
              const epFromLink = searchParams.get("e");
              return (
                <Link
                  key={ep.id}
                  onClick={() => handleEpisodeChange(ep.episode_number)}
                  href={`/tv/${tmdbId}/watch?s=${ep.season_number}&e=${ep.episode_number}`}
                  className={`w-full min-h-40 h-fit my-4 p-2 rounded-sm ${
                    ep.episode_number === seasonEpisode.episode
                      ? "bg-stone-900"
                      : "bg-transparent"
                  }`}
                >
                  <div className="w-full h-4/6">
                    <Image
                      src={
                        process.env.NEXT_PUBLIC_TMDB_IMAGE_URL + ep.still_path
                      }
                      alt="thumbnail"
                      width={800}
                      height={200}
                      quality={100}
                      className="w-full"
                    />
                  </div>
                  <button
                    className={
                      "px-1 py-2 w-full text-nowrap text-left overflow-hidden text-ellipsis border-stone-600 rounded-lg text-xl md:text-lg"
                    }
                  >
                    {ep.episode_number} : {ep.name}
                  </button>
                  {new Date() < new Date(ep.air_date) && (
                    <div>(Yet to come out)</div>
                  )}
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};

export default Episodes;
