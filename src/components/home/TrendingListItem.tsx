import Image from "next/image";
import Link from "next/link";
import React from "react";

interface TrendingListItemProps {
  name: string;
  imageUrl: string;
  releaseYear: string;
  href: string;
}
const TrendingListItem: React.FC<TrendingListItemProps> = ({
  name,
  imageUrl,
  releaseYear,
  href,
}) => {
  return (
    <Link href={href}>
      <Image
        src={process.env.NEXT_PUBLIC_TMDB_IMAGE_URL + imageUrl}
        width={800}
        height={10}
        alt="image"
        loading="eager"
        className="min-w-64 h-40 md:min-w-96  md:h-56 object-cover"
      />
      <div className="m-2">
        <h3 className="text-lg sm:text-xl font-semibold">{name}</h3>
        <p>{releaseYear}</p>
      </div>
    </Link>
  );
};

export default TrendingListItem;
