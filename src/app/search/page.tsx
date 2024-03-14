import Pagination from "@/components/search/Pagination";
import CatalogList from "@/components/shared/CatalogList";
import fetchSearchResults from "@/libs/FetchSearchResults";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Search",
};

interface SearchProps {
  searchParams: { q: string; type: "movie" | "tv"; page: number };
}

const Search: React.FC<SearchProps> = async ({ searchParams }) => {
  const { q, type, page } = searchParams;
  const searchResult = await fetchSearchResults(type, q, page);
  const { results, totalPages, totalResults } = searchResult;

  return (
    <div className="text-white py-24 px-0 sm:px-10 md:px-16 my-10">
      <h1 className="px-2 text-lg sm:px-0 sm:text-2xl">
        {totalResults} result(s) found for <b>{q}</b> in {type}
      </h1>

      <CatalogList list={results} type={type} />

      <Pagination
        href={`/search?q=${q}&type=movie`}
        type={type}
        totalPages={totalPages}
        currentPage={page}
      />
    </div>
  );
};

export default Search;
