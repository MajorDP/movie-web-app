import { useState, useEffect } from "react";
import { IMovie } from "../interfaces/movies";

export const useFetchMovie = (id: string) => {
  const [movieData, setMovieData] = useState<{
    movie: IMovie | null;
    error: string | null;
    isLoading: boolean;
  }>({
    movie: null,
    error: null,
    isLoading: true,
  });

  useEffect(() => {
    const getMovieById = async () => {
      try {
        const res = await fetch(`http://localhost:5000/movies/movie/${id}`);
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message);
        }
        const data = await res.json();
        setMovieData({ movie: data, error: null, isLoading: false });
      } catch (error) {
        //@ts-expect-error error is of right type
        setMovieData({ movie: null, error: error.message, isLoading: false });
      }
    };
    getMovieById();
  }, [id]);

  return movieData;
};
