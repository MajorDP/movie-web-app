import React, { useState } from "react";
// import "./StarRating.css";

interface IStarRating {
  currentRating: number;
}
const StarRating = ({ currentRating }: IStarRating) => {
  const [rating, setRating] = useState({
    rating: currentRating,
    hasVoted: false,
  });
  const [hover, setHover] = useState(0);
  const [value, setValue] = useState("");
  return (
    <div className="w-full flex flex-col">
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
        className="disabled:bg-gray-500 disabled:hover:bg-gray-500 disabled:hover:scale-100 disabled:border-0 disabled:text-black block w-fit m-auto mt-5 px-4 py-2 bg-amber-500 border hover:bg-green-600 text-black hover:text-white hover:scale-105 duration-300 rounded-xl cursor-pointer"
        disabled={!rating.hasVoted || value === ""}
      >
        Submit Rating
      </button>
    </div>
  );
};

export default StarRating;
