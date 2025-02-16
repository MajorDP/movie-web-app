import { useFetchMovie } from "../hooks/useMovie";
import { useParams } from "react-router-dom";
import Error from "../components/Error";
import Spinner from "../components/Spinner";
import StarRating from "../components/StarRating";
import UserRatings from "../components/UserRatings";
import { useContext, useState } from "react";
import ConfirmationModal from "../components/ConfirmationModal";
import { AuthContext } from "../context/userContext";

const MoviePage = () => {
  const { id } = useParams();

  const { movie, error, isLoading } = useFetchMovie(id as string);

  const { user, removeMovieFromSaved, addMovieToSaved } =
    useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Error message={error} showReturnBtn={true} />;
  }
  const isSaved = user.savedMovies.find(
    (savedMovie) => savedMovie.movieId === movie?.id
  );

  const trailerId = movie?.trailer.split("v=")[1].split("&")[0];

  return (
    movie && (
      <>
        {isModalOpen && (
          <ConfirmationModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={() => {
              removeMovieFromSaved(id as string, user.id as string);
              setIsModalOpen(false);
            }}
            message={`Do you want to remove ${movie.title} from your watchlist?`}
          />
        )}
        <div className="mx-auto py-16 px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-1/3 flex items-center h-fit">
              <img
                src={movie.img}
                alt={movie.title}
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="w-full lg:w-2/3">
              <h1 className="text-4xl font-bold text-white">{movie.title}</h1>
              <p className="text-gray-400 text-sm mt-2">{movie.releaseDate}</p>

              <div className="mt-4">
                <h3 className="text-2xl font-semibold text-white">
                  Description
                </h3>
                <p className="text-gray-300 mt-2">{movie.description}</p>
              </div>

              <div className="mt-4 flex justify-center sm:justify-start">
                {user.isLoggedIn && !isSaved && (
                  <button
                    className="w-fit px-4 py-2 bg-amber-500 border hover:bg-green-600 text-black hover:text-white hover:scale-105 duration-300 rounded-xl cursor-pointer"
                    onClick={() => user.id && addMovieToSaved(movie, user.id)}
                  >
                    Add To Watchlist
                  </button>
                )}{" "}
                {user.isLoggedIn && isSaved && (
                  <button
                    className="w-fit px-4 py-2 bg-amber-500 border hover:bg-green-600 text-black hover:text-white hover:scale-105 duration-300 rounded-xl cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Remove From Watchlist
                  </button>
                )}
              </div>

              <div className="mt-4">
                <h3 className="text-2xl font-semibold text-white">Trailer</h3>
                <iframe
                  className="w-full h-64 mt-2"
                  src={`https://www.youtube.com/embed/${trailerId}`} // Embed the video with ID
                  title="Trailer"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-5 p-4 bg-[rgba(0,0,0,0.5)]">
                <div>
                  <h3 className="text-lg font-semibold text-white">Genres</h3>
                  <ul className="text-gray-300">
                    {movie.genres.map((genre: string, index: number) => (
                      <li key={index}>{genre}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Duration</h3>
                  <p className="text-gray-300">{movie.duration} minutes</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white">Director</h3>
                  <p className="text-gray-300">{movie.director}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white">Language</h3>
                  <p className="text-gray-300">{movie.language}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-orange-300">
                    Rating
                  </h3>
                  <p className="text-gray-300">{movie.rating} / 5 Stars</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-orange-300">
                    Awards
                  </h3>
                  <ul className="text-gray-300">
                    {movie.awards.map((award: string, index: number) => (
                      <li key={index}>{award}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white ">Cast</h3>
                  <ul className="text-gray-300">
                    {movie.cast.map((award: string, index: number) => (
                      <li key={index}>{award}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {user.isLoggedIn && id && (
            <div className="mt-10">
              <StarRating currentRating={movie.rating} movieId={id} />
            </div>
          )}
          <div className="mt-12">
            <UserRatings reviews={movie.reviews} />
          </div>
        </div>
      </>
    )
  );
};

export default MoviePage;
