import React from "react";
import Navbar from "./Header/Navbar";
import UserActions from "./Header/UserActions";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex justify-between items-center mx-auto w-full max-w-6xl h-16">
      <h1 className="font-bold">
        <Link href="/" className="text-[#ffffff] text-xl">
          Food<span className="text-[#FF9F0D]">tuck</span>
        </Link>
      </h1>
      <Navbar />
      <UserActions />
    </header>
  );
};

export default Header;
