import { useState, useEffect } from "react";
import IMovie from "../interfaces/movies";
import Spinner from "../components/Spinner";
import MovieCard from "../components/MovieCard";
import Error from "../components/Error";

const MoviesPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [movies, setMovies] = useState<IMovie[] | null>(null);
  const [filters, setFilters] = useState({
    searchValue: "",
    sortValue: "",
  });

  useEffect(() => {
    const getFeaturedMovies = async () => {
      const res = await fetch(
        `http://localhost:5000/movies/filter?val1=${filters.searchValue}&val2=${filters.sortValue}`
      );
      const data = await res.json();

      setMovies(data);
      setIsLoading(false);
    };
    getFeaturedMovies();
  }, [filters.searchValue, filters.sortValue]);

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
          <div className="bg-gray-900 flex flex-col sm:flex-row justify-center my-4 w-fit m-auto px-4 pt-2 pb-3 rounded-xl">
            <div className="flex flex-col">
              <label>Search By Name</label>
              <input
                placeholder="Deadpool..."
                className="border px-2 py-1 w-fit mt-1 rounded-md"
                onChange={(e) =>
                  setFilters({ ...filters, searchValue: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col sm:ml-4">
              <label>Sort By</label>
              <select
                onChange={(e) =>
                  setFilters({ ...filters, sortValue: e.target.value })
                }
                className="border px-2 py-1 w-fit mt-1 rounded-md"
                defaultValue=""
              >
                <option value="" className="bg-white text-gray-700">
                  Default
                </option>
                <option value="rating-desc" className="bg-white text-gray-700">
                  Rating (Highest up)
                </option>
                <option value="rating-asc" className="bg-white text-gray-700">
                  Rating (Lowest up)
                </option>
                <option
                  value="duration-desc"
                  className="bg-white text-gray-700"
                >
                  Duration (Longest up)
                </option>
                <option value="duration-asc" className="bg-white text-gray-700">
                  Duration (Shortest up)
                </option>
                <option value="awards-desc" className="bg-white text-gray-700">
                  Most Awarded
                </option>
                <option value="awards-asc" className="bg-white text-gray-700">
                  Least Awarded
                </option>
              </select>
            </div>
          </div>
          {movies.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {movies.map((movie, index) => (
                <MovieCard movie={movie} key={index} size="big" />
              ))}
            </ul>
          ) : (
            <Error message="Could not find any movies." />
          )}
        </div>
      </section>
    )
  );
};

export default MoviesPage;
