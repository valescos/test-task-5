import { Navigate } from "react-router-dom";
import SignUpForm from "../components/SignUpForm";

export default function SignUpLogIn() {
  const cookie = false;

  if (cookie) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex h-[100vh] flex-col items-center justify-center">
      <SignUpForm />
    </div>
  );
}
