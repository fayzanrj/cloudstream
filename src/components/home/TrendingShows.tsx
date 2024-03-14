import FetchTrendingShows from "@/libs/FetchTrendingShows";
import React from "react";
import ListLayout from "./ListLayout";
import Image from "next/image";
import ListItem from "./TrendingListItem";
import TrendingListItem from "./TrendingListItem";

const TrendingShows = async () => {
  const shows = await FetchTrendingShows();

  if (shows === undefined) return <div>Error</div>;

  return (
    <ListLayout heading="Shows">
      {shows?.map((show, index) => {
        return (
          <TrendingListItem
            key={show.id}
            href={`/tv/${show.id}`}
            name={show.name}
            imageUrl={show.backdrop_path}
            releaseYear={show.first_air_date.substring(0, 4)}
          />
        );
      })}
    </ListLayout>
  );
};

export default TrendingShows;
