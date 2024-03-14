import { MovieDetailsProps } from "@/props/MovieProps";
import { TvDetailsProps } from "@/props/TvShowProps";
import React from "react";

const fetchDetails = async (type: "movie" | "tv", tmdbID: number) => {
  try {
    const response = await fetch(
      `${process.env.TMDB_API_URL}/${type}/${tmdbID}?api_key=${process.env.TMDB_API_KEY}`,
      { cache: "no-store" }
    );

    const res = await response.json();
    if (type === "movie") {
      return res as MovieDetailsProps;
    } else {
      return res as TvDetailsProps;
    }
  } catch (error) {
    console.log(error);
  }
};

export default fetchDetails;
