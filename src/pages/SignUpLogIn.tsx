import { Navigate } from "react-router-dom";
import SignUpForm from "../components/SignUpForm";
import { useCookies } from "react-cookie";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useEffect } from "react";
import { fetchTeam } from "../store/slices/teamSlice";

export default function SignUpLogIn() {
  const { token } = useAppSelector((state) => state.form);
  const dispatch = useAppDispatch();
  const [cookies, setCookie, __] = useCookies(["token"]);

  useEffect(() => {
    dispatch(fetchTeam());
  }, []);

  useEffect(() => {
    if (token) setCookie("token", token);
  }, [token]);

  if (cookies.token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex h-[100vh] flex-col mt-8 lg:mt-0 items-center lg:justify-center">
      <SignUpForm />
    </div>
  );
}
