import { navbarItemsData } from "@/data/navbar";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav>
      <ul className="flex items-center gap-9">
        {navbarItemsData.map((item) => (
          <li>
            <Link className="text-[#ffffff] hover:text-[#FF9F0D] duration-300" href={item.href}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
