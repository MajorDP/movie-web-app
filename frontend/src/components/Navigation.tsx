import { useState } from "react";
import { Link } from "react-router-dom";

function Navigation() {
  const [isOpen, setIsOpen] = useState(true);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="py-4 px-4 bg-[rgba(0,0,0,0.4)] bg-opacity-50 shadow-2xl">
      <nav className="flex flex-row justify-between text-2xl">
        <Link
          to="/"
          className="hidden md:block text-xl lg:text-3xl hover:scale-105 duration-300"
        >
          <span>🎬</span>
          <span className="text-white hover:text-blue-300">Movie Dock</span>
        </Link>

        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col justify-center items-center space-y-2 z-20"
        >
          <div className="w-8 h-1 bg-white"></div>
          <div className="w-8 h-1 bg-white"></div>
          <div className="w-8 h-1 bg-white"></div>
        </button>

        <ul className="hidden md:flex flex-row w-[50%] justify-between text-lg lg:text-2xl">
          <li className="hover:scale-105 duration-300 ease-in-out hover:text-blue-300">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:scale-105 duration-300 ease-in-out hover:text-blue-300">
            <Link to="/movies">Movies</Link>
          </li>
          <li className="hover:scale-105 duration-300 ease-in-out hover:text-blue-300">
            <Link to="/watchlist">Watchlist</Link>
          </li>
        </ul>

        <ul
          className={`md:hidden w-full bg-black z-10 shadow-2xl absolute top-16 left-0 transition-transform duration-300 ease-in-out text-lg ${
            isOpen
              ? "transform translate-y-[-4rem]"
              : "transform -translate-y-[20rem]"
          }`}
        >
          <li className="py-4 text-center hover:scale-105 duration-300 ease-in-out hover:text-blue-300">
            <Link to="/">Home</Link>
          </li>
          <li className="py-4 text-center hover:scale-105 duration-300 ease-in-out hover:text-blue-300 z-50">
            <Link to="/movies">Movies</Link>
          </li>
          <li className="py-4 text-center hover:scale-105 duration-300 ease-in-out hover:text-blue-300">
            <Link to="/watchlist">Watchlist</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navigation;
