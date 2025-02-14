import { useContext } from "react";
import { Review } from "../interfaces/movies";
import Error from "./Error";
import { AuthContext } from "../context/userContext";

interface IUserRatings {
  reviews: Review[];
}
function UserRatings({ reviews }: IUserRatings) {
  const { user } = useContext(AuthContext);
  return (
    <div className="w-full lg:w-[70%] m-auto">
      <h3 className="text-2xl text-center pt-5">Reviews from other users</h3>
      {reviews ? (
        reviews.map((review: Review, index: number) => (
          <ul className="flex flex-col gap-4 mt-5">
            <li
              key={index}
              className="flex flex-col bg-gray-800 w-full px-6 py-4 rounded-xl"
            >
              <div className="flex flex-row">
                <div className="w-20 h-fit sm:w-24 bg-red-200 rounded-full overflow-hidden">
                  <img
                    src={review.userImg}
                    alt="User"
                    className="w-full h-fill"
                  />
                </div>
                <div className="flex flex-col items-start justify-start ml-2 w-fit md:w-[90%] text-sm md:text-[18px]">
                  <p className="text-sm md:text-xl">{review.userEmail}</p>
                  <p className="text-sm text-gray-400">{review.datePosted}</p>
                  <p className="flex flex-row justify-center">
                    {[...Array(5)].map((star, index) => {
                      index += 1;
                      return (
                        <span
                          key={index}
                          className={`cursor-default ${
                            index <= review.rating
                              ? "text-[#ffd900]"
                              : "text-[#ffd90073]"
                          }`}
                        >
                          <span className="text-lg">&#9733;</span>
                        </span>
                      );
                    })}
                  </p>
                  <div className="hidden md:flex flex-row text-md mt-3">
                    {review.comment}
                  </div>
                </div>
              </div>
              <div className="flex md:hidden flex-row text-xs mt-3">
                {review.comment}
              </div>
            </li>
          </ul>
        ))
      ) : (
        <Error
          message="There are no reviews for this movie yet."
          showReturnBtn={!user.isLoggedIn}
          returnBtnLink="/auth"
          returnBtnMessage="Sign in to leave a review."
          errorMsgColor="primary"
        />
      )}
    </div>
  );
}

export default UserRatings;
