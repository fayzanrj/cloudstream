"use client";
import { EpisodeProps, TvDetailsProps } from "@/props/TvShowProps";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import AllEpisodes from "./AllEpisodes";
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
    <div className="w-full min-h-[100vh] text-white px-2 py-20" id="episodes">
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
          <div className="flex flex-wrap gap-3 relative px-4">
            {episodes.map((ep) => {
              const epFromLink = searchParams.get("e");
              const parsedEpisode =
                epFromLink !== null ? parseInt(epFromLink) : 1;
              return (
                <Link
                  key={ep.id}
                  onClick={() => handleEpisodeChange(ep.episode_number)}
                  href={`/tv/${tmdbId}/watch?s=${ep.season_number}&e=${ep.episode_number}`}
                >
                  <button
                    className={`p-2 px-4 border border-stone-600 rounded-lg ${
                      ep.episode_number === seasonEpisode.episode
                        ? "bg-stone-600"
                        : "bg-transparent"
                    }`}
                  >
                    {ep.episode_number} : {ep.name}
                  </button>
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
