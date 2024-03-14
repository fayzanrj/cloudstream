import Episodes from "@/components/episodes/Episodes";
import fetchDetails from "@/libs/FetchMovieDetails";
import { TvDetailsProps } from "@/props/TvShowProps";
import "@/styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tv Shows",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { tmdbId: number };
}>) {
  const details = (await fetchDetails("tv", params.tmdbId)) as TvDetailsProps;
  return (
    <main className="scroll-smooth">
      {children}
      <Episodes tmdbId={params.tmdbId} tvDetails={details} />
    </main>
  );
}
