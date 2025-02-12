import { useState, useEffect } from "react";
import IMovie from "../interfaces/movies";
import Spinner from "../components/Spinner";
import MovieCard from "../components/MovieCard";

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
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {movies.map((movie, index) => (
              <MovieCard movie={movie} key={index} size="big" />
            ))}
          </ul>
        </div>
      </section>
    )
  );
};

export default MoviesPage;
