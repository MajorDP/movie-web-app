import { Link } from "react-router-dom";

interface IError {
  message: string;
  showReturnBtn?: boolean;
}

export const Error = ({ message, showReturnBtn }: IError) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-red-300 font-semibold text-xl">{message}</p>{" "}
      {showReturnBtn && (
        <Link
          to="/"
          className="hover:scale-105 hover:text-green-400 duration-300"
        >
          Back To Home{" "}
        </Link>
      )}
    </div>
  );
};

export default Error;
