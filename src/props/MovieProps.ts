export interface MovieProps {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  release_date: string;
}

export interface MovieDetailsProps extends MovieProps {
  genres: { id: number; name: string }[];
  runtime: number;
  tagline: string;
}
