import { Navigate } from "react-router-dom";
import SignUpForm from "../components/SignUpForm";
import { useCookies } from "react-cookie";
import { useAppSelector } from "../store/store";
import { useEffect } from "react";

export default function SignUpLogIn() {
  const { token } = useAppSelector((state) => state.form);
  const [cookies, setCookie, __] = useCookies(["token"]);

  useEffect(() => {
    if (token) setCookie("token", token);
  }, [token]);

  if (cookies.token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex h-[100vh] flex-col items-center justify-center">
      <SignUpForm />
    </div>
  );
}
