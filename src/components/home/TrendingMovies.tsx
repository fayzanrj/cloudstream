import FetchTrendingMovies from "@/libs/FetchTrendingMovies";
import ListLayout from "./ListLayout";
import TrendingListItem from "./TrendingListItem";

const TrendingMovies = async () => {
  const movies = await FetchTrendingMovies();

  if (movies === undefined) return <div>Error</div>;

  return (
    <ListLayout heading="Movies">
      {movies.map((movie, index) => (
        <TrendingListItem
          key={movie.id}
          href={`/movies/${movie.id}`}
          name={movie.title}
          imageUrl={movie.backdrop_path}
          releaseYear={movie.release_date.substring(0, 4)}
        />
      ))}
    </ListLayout>
  );
};

export default TrendingMovies;
