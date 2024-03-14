import { InboxArrowDownIcon, TvIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

interface DetailCardProps {
  id: number;
  backgroundImage: string;
  tagLine: string;
  title: string;
  releaseDate: string;
  genres: {
    id: number;
    name: string;
  }[];
  adult: boolean;
  overview: string;
  variant: "movie" | "tv";
  children: React.ReactNode;
}

const DetailCard: React.FC<DetailCardProps> = ({
  id,
  backgroundImage,
  tagLine,
  title,
  genres,
  adult,
  overview,
  variant,
  children,
  releaseDate,
}) => {
  return (
    <section
      className="min-w-full h-svh relative BG_IMAGE px-2 sm:px-20"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.454295096945028) 0%, rgba(0,0,0,0.7904295507265406) 49%), url(https://image.tmdb.org/t/p/original${backgroundImage}`,
      }}
    >
      <div className=" z-40 text-white absolute bottom-2 w-[95%] sm:w-[30rem]">
        {/* Tagline */}
        <div>
          <h3 className="text-sm sm:text-lg">&#34;{tagLine}&#34;</h3>
        </div>

        {/* Title */}
        <h2 className="text-4xl sm:text-6xl my-2 font-semibold">{title}</h2>

        <div className="sm:text-lg px-2 text-gray-400">
          {genres.map((genre, index) => (
            <>
              <span key={genre.id}>{genre.name}</span>
              {index + 1 !== genres.length && <span> &#8226; </span>}
            </>
          ))}
          {adult && (
            <>
              <span> &#8226; </span>
              <span>18+</span>
            </>
          )}
        </div>

        <div>
          <div className="sm:text-lg px-2 text-gray-400">{children}</div>
        </div>

        {/* Buttons */}
        {variant === "movie" && (
          <div className="my-4 sm:my-8">
            <Link href={`/movies/${id}/watch`}>
              <button className="bg-[#a18aff] border-[#a18aff] border px-4 sm:px-8 py-1.5 sm:py-2.5 font-bold mx-2 rounded-lg sm:text-xl text-black">
                <TvIcon className="h-5 sm:h-6 2-5 sm:w-6 inline-block" />
                <span className="align-middle ml-1 sm:ml-3">Watch now</span>
              </button>
            </Link>
            <br className="sm:hidden" />
          </div>
        )}

        {variant === "tv" && (
          <div className="my-4 sm:my-8">
            <Link className="inline-block" href={`/tv/${id}/watch?s=1&e=1`}>
              <button className="bg-[#a18aff] border-[#a18aff] border px-4  py-1.5 sm:py-2.5 font-bold mx-2 rounded-lg sm:text-xl text-black">
                <TvIcon className="h-5 sm:h-6 2-5 sm:w-6 inline-block" />
                <span className="align-middle ml-1 sm:ml-3">Watch S1E1</span>
              </button>
            </Link>
            <br className="block sm:hidden" />
            <Link href={`/tv/${id}#episodes`}>
              <button className="bg-[#a18aff] border-[#a18aff] border px-4  py-1.5 sm:py-2.5 font-bold mx-1 rounded-lg sm:text-xl text-black my-2 sm:my-0">
                <TvIcon className="h-5 sm:h-6 2-5 sm:w-6 inline-block" />
                <span className="align-middle ml-1 sm:ml-3">
                  Check episodes
                </span>
              </button>
            </Link>
          </div>
        )}

        {/* Overview */}
        <div
          className={`${
            overview.length > 200 ? "my:2.5 sm:my-5" : "my:5 sm:my-10"
          }`}
        >
          <p className="sm:text-xl font-semibold">
            Overview :{" "}
            <span
              className={`font-normal ${
                overview.length > 200
                  ? "text-xs sm:text-sm"
                  : "text-sm sm:text-lg"
              }`}
            >
              {overview}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default DetailCard;
