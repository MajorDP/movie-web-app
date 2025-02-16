import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { IMovie } from "../interfaces/movies";
import Spinner from "./Spinner";

function PopularMovies() {
  const [isLoading, setIsLoading] = useState(true);

  const [movies, setMovies] = useState<IMovie[] | null>(null);

  useEffect(() => {
    const getFeaturedMovies = async () => {
      const res = await fetch("http://localhost:5000/movies/popular");
      const data = await res.json();

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
      <div className="px-6 bg-gray-900">
        <h2 className="text-2xl font-bold mb-4 text-center">
          🔥 Trending Now 🔥
        </h2>
        <ul className="flex flex-wrap md:flex-nowrap overflow-x-auto gap-4 justify-center">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} size="big" />
          ))}
        </ul>
      </div>
    )
  );
}

export default PopularMovies;
