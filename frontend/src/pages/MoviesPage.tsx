import { useState, useEffect } from "react";
import IMovie from "../interfaces/movies";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";

const MoviesPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [movies, setMovies] = useState<IMovie[] | null>(null);

  useEffect(() => {
    const getFeaturedMovies = async () => {
      const res = await fetch("http://localhost:5000/movies/");
      const data = await res.json();
      console.log(data);
      setMovies(data);
      setIsLoading(false);
    };
    getFeaturedMovies();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    movies && (
      <section id="movies" className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Browse Movies
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {movies.map((movie, index) => (
              <div
                key={index}
                className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg"
              >
                <img
                  src={movie.img}
                  alt={movie.title}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <Link
                    to={`/movies/${movie.id}`}
                    className="bg-red-600 py-2 px-4 rounded-lg text-white"
                  >
                    See Details
                  </Link>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{movie.title}</h3>
                  <p className="text-sm text-gray-400">{movie.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  );
};

export default MoviesPage;
