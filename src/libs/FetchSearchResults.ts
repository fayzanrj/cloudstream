import { MovieProps } from "@/props/MovieProps";
import { TvShowProps } from "@/props/TvShowProps";

const fetchSearchResults = async (
  type: "movie" | "tv",
  query: string,
  page: number
) => {
  try {
    const response = await fetch(
      `${process.env.TMDB_API_URL}/search/${type}?query=${query}&include_adult=false&page=${page}&api_key=${process.env.TMDB_API_KEY}`,
      { cache: "no-store" }
    );

    const res = await response.json();
    let results;
    if (type === "movie") {
      results = res.results as MovieProps[];
    } else {
      results = res.results as TvShowProps[];
    }
    const totalPages = res.total_pages | 0;
    const totalResults = res.total_results | 0;
    return { results, totalPages, totalResults };
  } catch (error) {
    console.log(error);
    let results;
    if (type === "movie") {
      results = [] as MovieProps[];
    } else {
      results = [] as TvShowProps[];
    }
    const totalPages = 0 as number;
    const totalResults = 0 as number;
    return { results, totalPages, totalResults };
  }
};

export default fetchSearchResults;
