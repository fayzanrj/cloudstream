"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Corrected import
import React, { useEffect } from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  href: string;
  type: "movie" | "tv";
  scroll?: boolean;
}

const inter = Inter({ subsets: ["latin"] });

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage = 1,
  href,
  type,
  scroll,
}) => {
  const router = useRouter();

  const moveToNewPage = (page: number) => {
    if (scroll) {
      document.documentElement.scrollTo({
        // @ts-ignore
        top: document.getElementById("discover").offsetTop,
        behavior: "smooth",
      });
      router.push(`${href}?page=${page}#discover`);
    } else {
      document.documentElement.scrollTop = 0;
      router.push(`${href}&page=${page}`);
    }
  };

  useEffect(() => {
    currentPage === parseInt(currentPage.toString());
  });
  return (
    <nav className={`${inter.className} text-center`}>
      <>
        {/* Prev Button */}
        <button
          onClick={() => moveToNewPage(parseInt(currentPage.toString()) - 1)}
          disabled={parseInt(currentPage.toString()) === 1}
          aria-label="Previous Page"
          className="align-middle disabled:opacity-25"
        >
          <ChevronLeftIcon className="h-4 w-4 md:h-6 md:w-6 text-white inline-block align-middle" />
          <span className="align-middle hidden md:inline-block">Previous</span>
        </button>

        {[
          parseInt(currentPage.toString()) - 3,
          parseInt(currentPage.toString()) - 2,
          parseInt(currentPage.toString()) - 1,
        ].map(
          (page, index) =>
            page > 0 && (
              <button
                key={page}
                onClick={() => moveToNewPage(page)}
                className={`w-10 h-10 rounded-md mx-1 sm:mx-3 text-xl align-middle ${
                  index === 0 && "hidden lg:inline-block"
                }`}
              >
                {page}
              </button>
            )
        )}

        <button
          disabled
          className="w-10 h-10 rounded-md mx-1 sm:mx-3 text-xl align-middle border"
        >
          {currentPage}
        </button>

        {[
          parseInt(currentPage.toString()) + 1,
          parseInt(currentPage.toString()) + 2,
          parseInt(currentPage.toString()) + 3,
          parseInt(currentPage.toString()) + 4,
        ].map(
          (page, index) =>
            page <= totalPages && (
              <button
                key={page}
                onClick={() => moveToNewPage(page)}
                className={`w-10 h-10 rounded-md mx-1 sm:mx-3 text-xl align-middle ${
                  (index === 2 || index === 3) && "hidden lg:inline"
                }`}
              >
                {page}
              </button>
            )
        )}

        {/* Next Button */}
        <button
          onClick={() => moveToNewPage(parseInt(currentPage.toString()) + 1)}
          disabled={parseInt(currentPage.toString()) === totalPages}
          aria-label="Next Page"
          className="align-middle disabled:opacity-25"
        >
          <span className="align-middle hidden md:inline-block">Next</span>
          <ChevronRightIcon className="h-4 w-4 md:h-6 md:w-6 text-white inline-block align-middle" />
        </button>
      </>
      <div className="my-6">
        <p>out of {totalPages} pages</p>
      </div>
    </nav>
  );
};

export default Pagination;
