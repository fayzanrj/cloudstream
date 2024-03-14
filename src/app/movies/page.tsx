import TrendingMovies from "@/components/home/TrendingMovies";
import Pagination from "@/components/search/Pagination";
import CatalogList from "@/components/shared/CatalogList";
import DetailCard from "@/components/shared/DetailCard";
import movieData from "@/constants/moviesData";
import fetchDiscover from "@/libs/FetchDiscover";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Movies",
};

interface MoviePageProps {
  searchParams: { page: number };
}

const Movies: React.FC<MoviePageProps> = async ({ searchParams }) => {
  const randomNumber = Math.floor(Math.random() * 8);
  const main = movieData[randomNumber];
  const { results, totalPages, totalResults, currentPage } =
    await fetchDiscover("movie", searchParams.page ? searchParams.page : 1);

  const {
    id,
    adult,
    backdrop_path,
    genres,
    title,
    overview,
    poster_path,
    release_date,
    tagline,
    runtime,
  } = main;

  return (
    <main>
      <DetailCard
        id={id}
        adult={adult}
        backgroundImage={backdrop_path}
        genres={genres}
        overview={overview}
        releaseDate={release_date}
        tagLine={tagline}
        title={title}
        variant="movie"
      >
        <span>
          {Math.floor(runtime / 60)} hours {runtime % 60} minutes
        </span>
      </DetailCard>

      <section className="w-full py-5 text-white">
        <TrendingMovies />
      </section>

      <section className="text-white w-full min-h-[100svh]" id="discover">
        <h2 className="m-4 text-3xl font-semibold">Discover</h2>
        <CatalogList list={results} type="movie" />

        {/* {currentPage > 0 && ( */}
        <Pagination
          href={`/movies`}
          type={"movie"}
          totalPages={totalPages}
          currentPage={searchParams.page}
          scroll
        />
        {/* )} */}
      </section>
    </main>
  );
};

export default Movies;
