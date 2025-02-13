import { useEffect, useState } from "react";
import IMovie from "../interfaces/movies";
import Spinner from "../components/Spinner";
import MovieCard from "../components/MovieCard";

function Watchlist() {
  const [isLoading, setIsLoading] = useState(true);

  const [movies, setMovies] = useState<IMovie[] | null>(null);

  useEffect(() => {
    const getFeaturedMovies = async () => {
      const res = await fetch("http://localhost:5000/movies/filter");
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
    <div className="mx-auto py-16 px-4 max-w-[90%] lg:max-w-[80%]">
      <h2 className="text-3xl font-bold text-center mb-12">Your Watchlist</h2>

      {movies && (
        <ul className="flex flex-wrap flex-row justify-center gap-8">
          {movies.map((movie, index) => (
            <MovieCard movie={movie} key={index} size="small" />
          ))}
        </ul>
      )}
    </div>
  );
}

export default Watchlist;
