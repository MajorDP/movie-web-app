import { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  return (
    <div className="m-auto my-16 bg-gray-800 w-fit md:w-[50%] rounded-xl p-5 flex flex-col items-center">
      {isSignIn ? <LoginForm /> : <SignUpForm />}
      {isSignIn ? (
        <button
          className="text-blue-400 mt-4 cursor-pointer hover:scale-105 duration-300"
          onClick={() => setIsSignIn(false)}
        >
          Don't have an account?
        </button>
      ) : (
        <button
          className="text-blue-400 mt-4 cursor-pointer hover:scale-105 duration-300"
          onClick={() => setIsSignIn(true)}
        >
          Already have an account?
        </button>
      )}
    </div>
  );
}

export default AuthPage;
