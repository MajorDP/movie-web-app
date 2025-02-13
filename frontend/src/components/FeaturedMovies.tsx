import { useEffect, useState } from "react";
import IMovie from "../interfaces/movies";
import Spinner from "./Spinner";

function FeaturedMovies() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [movies, setMovies] = useState<IMovie[] | null>(null);

  useEffect(() => {
    const getFeaturedMovies = async () => {
      const res = await fetch("http://localhost:5000/movies/featured");
      const data = await res.json();

      setMovies(data);
      setIsLoading(false);
    };
    getFeaturedMovies();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  const nextMovie = () => {
    if (movies) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }
  };

  const prevMovie = () => {
    if (movies) {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + movies.length) % movies.length
      );
    }
  };
  return (
    movies && (
      <div className="md:mt-10 mt-0 relative h-[30rem] sm:h-[20rem] lg:h-[30rem] xl:h-[30rem]">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black opacity-80"></div>

        <div className="w-full flex items-end h-full justify-center">
          <img
            src={movies[currentIndex].img}
            alt={movies[currentIndex].title}
            className="w-full h-full  absolute object-contain opacity-70"
          />

          <button
            className="text-4xl top-1/2 left-0 lg:left-1/4 cursor-pointer hover:scale-115 duration-300 absolute"
            onClick={prevMovie}
          >
            {"<"}
          </button>

          <div className="flex flex-col justify-start w-full lg:w-[70%] xl:w-[50%] px-4 md:px-8 bg-[rgba(0,0,0,0.7)] rounded-full p-2 z-10 shadow-2xl">
            <p className="z-10 text-sm sm:text-base xl:text-xl mb-2">
              <span className="font-semibold">Featured: </span>
              <span>{movies[currentIndex].title}</span>
            </p>
            <p className="z-10 text-xs sm:text-sm xl:text-lg text-gray-300 mb-4">
              <span className="truncate block">
                {movies[currentIndex].description}
              </span>
            </p>
            <button className="px-6 py-2 w-fit m-auto bg-red-600 text-white rounded-lg hover:bg-fuchsia-900 hover:cursor-pointer hover:scale-110 transition-all duration-400 z-10">
              See Details
            </button>
          </div>

          <button
            className="text-4xl top-1/2 right-0 lg:right-1/4 cursor-pointer hover:scale-115 duration-300 absolute"
            onClick={nextMovie}
          >
            {">"}
          </button>
        </div>
      </div>
    )
  );
}

export default FeaturedMovies;
