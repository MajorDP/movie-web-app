import { Link } from "react-router-dom";

interface IError {
  message: string;
  showReturnBtn?: boolean;
  returnBtnMessage?: string;
  returnBtnLink?: string;
  errorMsgColor?: string;
}

export const Error = ({
  message,
  showReturnBtn,
  returnBtnMessage,
  returnBtnLink,
  errorMsgColor,
}: IError) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <p
        className={`${
          errorMsgColor === "primary" ? "text-red-300" : "text-white"
        } font-semibold text-lg sm:text-2xl`}
      >
        {message}
      </p>{" "}
      {showReturnBtn && (
        <Link
          to={returnBtnLink || "/"}
          className="text-sm md:text-lg hover:scale-105 hover:text-blue-200 duration-300 underline"
        >
          {returnBtnMessage || "Back To Home"}
        </Link>
      )}
    </div>
  );
};

export default Error;
