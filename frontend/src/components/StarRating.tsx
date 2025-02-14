import { useContext, useState } from "react";
import { AuthContext } from "../context/userContext";

interface IStarRating {
  currentRating: number;
  movieId: string;
}
const StarRating = ({ currentRating, movieId }: IStarRating) => {
  const { user } = useContext(AuthContext);
  const [rating, setRating] = useState({
    rating: currentRating,
    hasVoted: false,
  });
  const [hover, setHover] = useState(0);
  const [value, setValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const review = {
      userId: user.id,
      rating: rating.rating,
      datePosted: new Date().toISOString().split("T")[0],
      userEmail: user.email,
      userImg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKFem0b3QKwZNYgZ3eCClFlnIlIn5V1nDJjw&s",
      comment: value,
    };

    const res = await fetch(
      `http://localhost:5000/movies/movie/review/${movieId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ review }),
      }
    );

    if (!res.ok) {
      console.log("ERR");
    } else {
      window.location.reload();
    }
    const data = await res.json();
    console.log(data);
  };
  return (
    <form className="w-full flex flex-col" onSubmit={handleSubmit}>
      <h3 className="text-2xl text-center">Rate Movie</h3>
      <div className="flex flex-row justify-center">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={`cursor-pointer ${
                index <= (hover || rating.rating)
                  ? "text-[#ffd900]"
                  : "text-[#ffd90073]"
              }`}
              onClick={() => setRating({ rating: index, hasVoted: true })}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating.rating)}
            >
              <span className="text-4xl">&#9733;</span>
            </button>
          );
        })}
      </div>
      <label className="block mt-2 text-center">Tell us what you think</label>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={5}
        cols={50}
        className="mt-1 bg-white rounded-xl text-black p-2 w-[80%] m-auto"
      />
      <button
        className="disabled:cursor-default disabled:bg-gray-500 disabled:hover:bg-gray-500 disabled:hover:scale-100 disabled:border-0 disabled:text-black block w-fit m-auto mt-5 px-4 py-2 bg-amber-500 border hover:bg-green-600 text-black hover:text-white hover:scale-105 duration-300 rounded-xl cursor-pointer"
        disabled={!rating.hasVoted || value === ""}
        type="submit"
      >
        Submit Review
      </button>
    </form>
  );
};

export default StarRating;
