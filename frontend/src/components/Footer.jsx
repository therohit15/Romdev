import React from "react";
import { Link } from "react-router";
import logo from "../assets/romdev.png";

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-base-300 text-neutral-content items-center p-4 absolute bottom-0">
      <aside className="grid-flow-col items-center">
        <img src={logo} alt="logo" className="w-8 h-8" />
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </aside>
      <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <p>
          Created by{" "}
          <Link
            to="https://gravatar.com/delightfullyhopefulf88ac8ec24"
            className=" bg-amber-50 rounded-xs p-2 text-black font-extrabold"
          >
            therohit
          </Link>
        </p>
      </nav>
    </footer>
  );
};

export default Footer;
