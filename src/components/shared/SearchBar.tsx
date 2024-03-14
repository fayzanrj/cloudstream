"use client";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

<MagnifyingGlassIcon className="h-6 w-6 text-gray-500" />;

const Search = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [type, setType] = useState<"movie" | "tv">("movie");
  const [search, setSearch] = useState<string>("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${search}&type=${type}&page=1`);
  };

  return (
    <>
      <button className="relative" onClick={() => setIsModalOpen(!isModalOpen)}>
        {isModalOpen ? (
          <XMarkIcon className="align-middle h-7 w-7 text-white" />
        ) : (
          <MagnifyingGlassIcon className="align-middle h-7 w-7 text-white" />
        )}
      </button>

      {isModalOpen && (
        <form
          className="w-[85%] sm:w-fit absolute right-10 sm:right-28 top-1 sm:top-4 rounded-lg bg-stone-900 px-2"
          onSubmit={handleSubmit}
        >
          {/* Type selection */}
          <label className="sr-only" htmlFor="type">
            Type
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) =>
              setType(e.target.value === "movie" ? "movie" : "tv")
            }
            className="bg-stone-900 border-stone-900 text-white outline-none"
          >
            <option value={"movie"}>Movie</option>
            <option value={"tv"}>Tv Show</option>
          </select>

          {/* Search */}
          <label className="sr-only" htmlFor="search">
            Search
          </label>
          <input
            className="w-[65%] sm:w-80 px-1 py-2.5 sm:p-2.5 pr-10 bg-transparent outline-none text-white placeholder:text-gray-300"
            placeholder="Search something"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="absolute right-2 top-1.5" onClick={handleSubmit}>
            <MagnifyingGlassIcon className="align-middle h-7 w-7 text-white" />
          </button>
        </form>
      )}
    </>
  );
};

export default Search;
