"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Search from "./SearchBar";

const NavLinks = [
  { id: "1", label: "Home", href: "/" },
  { id: "2", label: "Movies", href: "/movies" },
  { id: "3", label: "Shows", href: "/tv" },
];

const Navbar = () => {
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollOffset(window.scrollY);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 px-2 sm:px-20 py-3.5 sm:py-6 left-0 w-full flex justify-between items-center ${
        scrollOffset > 10 ? "bg-[#0d0c0f] duration-700" : "" // Apply black background when scroll offset is more than 10
      }`}
    >
      <ul className="w-full">
        {/* Navigation links */}
        {NavLinks.map((item) => (
          <li
            className={`inline-block align-middle text-lg text-white mx-3 sm:mx-8`}
            key={item.id}
          >
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>

      {/* Search button */}
      <Search />
    </nav>
  );
};

export default Navbar;
