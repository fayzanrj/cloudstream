import { TvShowProps } from "@/props/TvShowProps";

const FetchTrendingShows = async () => {
  try {
    const response = await fetch(
      `${process.env.TMDB_API_URL}/trending/tv/week?api_key=${process.env.TMDB_API_KEY}`,
      { cache: "no-store" }
    );

    const res = await response.json();
    return res.results as TvShowProps[];
  } catch (error) {
    console.log(error);
  }
};

export default FetchTrendingShows;
