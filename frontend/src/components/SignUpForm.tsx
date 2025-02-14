import { useState } from "react";
import Input from "./Input";

function SignUpForm() {
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });

  return (
    <form className=" border px-10 py-4 rounded-xl">
      <h2 className="text-4xl text-center py-2">Sign Up</h2>
      <div className="flex flex-col w-fit m-auto text-xl mt-10">
        <div className="my-2 flex flex-col">
          <Input
            label="Email"
            type="Email"
            placeholder="Enter your email"
            value={authData.email}
            onChange={(e) => {
              setAuthData({ ...authData, email: e.target.value });
            }}
          />
        </div>
        <div className="my-2 flex flex-col">
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={authData.password}
            onChange={(e) => {
              setAuthData({ ...authData, password: e.target.value });
            }}
          />
        </div>
        <div className="my-2 flex flex-col">
          <Input
            label="Repeat Password"
            type="password"
            placeholder="Repeat your password"
            value={authData.repeatPassword}
            onChange={(e) => {
              setAuthData({ ...authData, repeatPassword: e.target.value });
            }}
          />
        </div>
        <button
          className="disabled:bg-gray-500 disabled:cursor-auto disabled:hover:scale-100 bg-green-500 w-fit m-auto px-4 py-2 rounded-xl mt-4 hover:cursor-pointer hover:scale-105 duration-300"
          type="submit"
          disabled={
            authData.email === "" ||
            authData.password === "" ||
            authData.repeatPassword === ""
          }
        >
          Sign Up
        </button>
      </div>
    </form>
  );
}

export default SignUpForm;
