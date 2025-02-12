import { Link } from "react-router-dom";
import IMovie from "../interfaces/movies";
import { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";

interface IMovieCard {
  movie: IMovie;
  size: string;
}

function MovieCard({ movie, size }: IMovieCard) {
  const isSmall = size === "small";
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {isModalOpen && (
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={() => {
            console.log("yes");
            setIsModalOpen(false);
          }}
          message={`Do you want to remove ${movie.title} from your watchlist?`}
        />
      )}
      <li
        className={`relative bg-gray-800 rounded-lg overflow-hidden shadow-lg ${
          isSmall ? "w-44" : "w-full"
        }`}
      >
        <img
          src={movie.img}
          alt={movie.title}
          className={`w-full ${isSmall ? "h-44" : "h-80"} object-cover`}
        />
        <div
          className={`absolute inset-0 bg-black flex flex-col justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300 ${
            isSmall ? "text-sm p-2" : "text-lg"
          }`}
        >
          <Link
            to={`/movies/${movie.id}`}
            className="bg-green-600 hover:scale-105 duration-300 py-1 px-2 rounded-lg text-white "
          >
            See Details
          </Link>
          <button
            className="mt-4 bg-red-600 hover:scale-105 duration-300 py-1 px-2 rounded-lg text-white cursor-pointer w-fit"
            onClick={() => setIsModalOpen(true)}
          >
            Remove From Watchlist
          </button>
        </div>
        <div className={`p-2 ${isSmall ? "text-xs" : "p-4"}`}>
          <h3 className={`font-semibold ${isSmall ? "text-sm" : "text-xl"}`}>
            {movie.title}
          </h3>
          {!isSmall && (
            <p className="text-sm text-gray-400">{movie.description}</p>
          )}
        </div>
      </li>
    </>
  );
}

export default MovieCard;
