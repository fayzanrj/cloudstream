import React, { useEffect, useState } from "react";
import { EpisodeProps } from "../../props/TvShowProps";
import Link from "next/link";

interface AllEpisodesProps {
  tmdbId: number;
  season: number;
}

const AllEpisodes: React.FC<AllEpisodesProps> = ({ tmdbId, season }) => {
  const [episodes, setEpisodes] = useState<EpisodeProps[]>([]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_TMDB_API_URL}/tv/${tmdbId}/season/${season}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        const res = await response.json();
        setEpisodes(res.episodes);
      } catch (error) {
        console.error(error);
      }
    };
  }, []);
  return (
    <div className="flex flex-wrap gap-3">
      {episodes.map((ep) => (
        <Link
          key={ep.id}
          href={`/tv/${tmdbId}/watch?s=${ep.season_number}&e=${ep.episode_number}`}
        >
          <button className="p-2 rounded-lg border border-stone-600">
            {ep.episode_number} : {ep.name}
          </button>
        </Link>
      ))}
    </div>
  );
};

export default AllEpisodes;
