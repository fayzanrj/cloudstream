import { MovieProps } from "@/props/MovieProps";
import { TvShowProps } from "@/props/TvShowProps";

const fetchDiscover = async (type: "movie" | "tv", page: number) => {
  try {
    const response = await fetch(
      `${process.env.TMDB_API_URL}/discover/${type}?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&api_key=${process.env.TMDB_API_KEY}`,
      { cache: "no-store" }
    );
    const res = await response.json();

    const results = res.results as (MovieProps | TvShowProps)[];
    const totalPages = res.total_pages | 0;
    const totalResults = res.total_results | 0;
    const currentPage = res.page as number | 0;
    return { results, totalPages, totalResults, currentPage };
  } catch (error) {
    console.log(error);
    const results = [] as (MovieProps | TvShowProps)[];
    const totalPages = 0 as number;
    const currentPage = 0 as number;
    const totalResults = 0 as number;
    return { results, totalPages, totalResults, currentPage };
  }
};

export default fetchDiscover;
