import { MovieProps } from "@/props/MovieProps";

const FetchTrendingMovies = async () => {
  try {
    const response = await fetch(
      `${process.env.TMDB_API_URL}/trending/movie/week?api_key=${process.env.TMDB_API_KEY}`,
      { cache: "no-store" }
    );

    const res = await response.json();
    return res.results as MovieProps[];
  } catch (error) {
    console.log(error);
  }
};

export default FetchTrendingMovies;
