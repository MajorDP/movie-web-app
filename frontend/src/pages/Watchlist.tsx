import { useContext, useEffect, useState } from "react";
import IMovie from "../interfaces/movies";
import Spinner from "../components/Spinner";
import MovieCard from "../components/MovieCard";
import { AuthContext } from "../context/userContext";
import Error from "../components/Error";

function Watchlist() {
  const { user, removeMovieFromSaved } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  const [movies, setMovies] = useState<IMovie[] | null>(null);

  useEffect(() => {
    const getFeaturedMovies = async () => {
      const res = await fetch(
        `http://localhost:5000/auth/movies/user/${user.id}`
      );
      const data = await res.json();

      setMovies(data);
      setIsLoading(false);
    };
    getFeaturedMovies();
  }, [user.id, removeMovieFromSaved]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="mx-auto py-16 px-4 max-w-[90%] lg:max-w-[80%]">
      <h2 className="text-3xl font-bold text-center mb-12">Your Watchlist</h2>

      {movies && movies.length > 0 ? (
        <ul className="flex flex-wrap flex-row justify-center gap-8">
          {movies.map((movie, index) => (
            <MovieCard movie={movie} size="small" key={index} />
          ))}
        </ul>
      ) : (
        <Error
          message="No saved movies yet."
          showReturnBtn={true}
          returnBtnLink="/movies"
          returnBtnMessage="Start by adding some"
        />
      )}
    </div>
  );
}

export default Watchlist;
