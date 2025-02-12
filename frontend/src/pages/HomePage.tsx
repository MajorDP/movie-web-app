import { Link } from "react-router-dom";
import FeaturedMovies from "../components/FeaturedMovies";
import PopularMovies from "../components/PopularMovies";

function HomePage() {
  return (
    <>
      <FeaturedMovies />
      <div className="w-full h-[20rem] flex flex-col items-center justify-center bg-gray-900 text-white text-center shadow-2xl">
        <h1 className="text-xl md:text-2xl lg:text-4xl font-bold mb-4">
          🎬 Your Next Favorite Movie Awaits
        </h1>
        <p className="text-sm lg:text-lg text-gray-300 mb-6">
          Browse hundreds of movies and build your perfect watchlist.
        </p>
        <Link
          to="/movies"
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-fuchsia-900 hover:scale-110 transition-all duration-300 cursor-pointer text-sm"
        >
          Explore Now
        </Link>
      </div>
      <PopularMovies />
    </>
  );
}

export default HomePage;
