import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

function AuthPage() {
  return (
    <div className="m-auto my-16 bg-gray-800 w-[80%] rounded-xl p-5 flex flex-row justify-around">
      <SignUpForm />
      <p className="flex items-center w-fit">OR</p>
      <LoginForm />
    </div>
  );
}

export default AuthPage;
