import { useState } from "react";
import {
  getAuthToken,
  setConfirmPassword,
  setEmail,
  setName,
  setPassword,
  validateForm,
} from "../store/slices/formSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { cn } from "../utilis";

export default function SignUpForm() {
  const [passwordShow, setPasswordsShow] = useState({
    pass: false,
    conf: false,
  });
  const { name, email, password, confirm_password, errors } = useAppSelector(
    (state) => state.form
  );
  const dispatch = useAppDispatch();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(validateForm());
    dispatch(getAuthToken());
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className={cn(
        "shadow-xl w-[90%] sm:w-[70%] md:w-[50%] lg:w-[35%] xl:w-[25%]",
        "flex flex-col gap-4 p-4 rounded-md",
        "[&>div>input]:bg-[#F8F8F8] [&>div>input]:px-4 [&>div>input]:py-2",
        "[&>div]:flex [&>div]:flex-col [&>div]:gap-4"
      )}
    >
      <h3 className="text-lg font-bold">Регистрация</h3>
      <div>
        <label htmlFor="username">Имя</label>
        <input
          className={cn(
            "rounded-md",
            errors.name && "border-rose-600 border-2"
          )}
          id="username"
          type="text"
          value={name}
          onChange={(e) => dispatch(setName(e.target.value))}
        />
        {errors.name && (
          <p className="text-rose-600 font-bold text-sm -mt-2">
            Обязательное поле
          </p>
        )}
      </div>
      <div>
        <label htmlFor="email">Электронная почта</label>
        <input
          className={cn(
            "rounded-md",
            errors.email && "border-rose-600 border-2"
          )}
          id="email"
          type="email"
          value={email}
          onChange={(e) => dispatch(setEmail(e.target.value))}
        />
        {errors.email && (
          <p className="text-rose-600 font-bold text-sm -mt-2">
            Неверный (или пустой) e-mail
          </p>
        )}
      </div>
      <div className="relative">
        <label htmlFor="pass">Пароль</label>
        <input
          className={cn(
            "rounded-md pr-6",
            errors.password && "border-rose-600 border-2"
          )}
          id="pass"
          type={passwordShow.pass ? "text" : "password"}
          value={password}
          onChange={(e) => dispatch(setPassword(e.target.value))}
        />
        {errors.password && (
          <p className="text-rose-600 font-bold text-sm -mt-2">
            Пароль должен состоять минимум из шести символов
          </p>
        )}
        <span
          onClick={() =>
            setPasswordsShow({
              ...passwordShow,
              pass: !passwordShow.pass,
            })
          }
          className="absolute cursor-pointer right-0 px-2 top-12"
        >
          {passwordShow.pass ? colsedeye : openeye}
        </span>
      </div>
      <div className="relative">
        <label htmlFor="pass_confirm">Подтвердите пароль</label>
        <input
          className={cn(
            "rounded-md pr-6",
            errors.confirm_password && "border-rose-600 border-2"
          )}
          id="pass_confirm"
          type={passwordShow.conf ? "text" : "password"}
          value={confirm_password}
          onChange={(e) => dispatch(setConfirmPassword(e.target.value))}
        />
        {errors.confirm_password && (
          <p className="text-rose-600 font-bold text-sm -mt-2">
            Пароль не совпадает с подтверждением
          </p>
        )}
        <span
          onClick={() =>
            setPasswordsShow({
              ...passwordShow,
              conf: !passwordShow.conf,
            })
          }
          className="absolute cursor-pointer right-0 px-2 top-12"
        >
          {passwordShow.conf ? colsedeye : openeye}
        </span>
      </div>
      <button className="bg-[#512689] px-4 py-2 text-white text-center rounded-md">
        Зарегистрироваться
      </button>
    </form>
  );
}

const openeye = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    />
  </svg>
);

const colsedeye = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
    />
  </svg>
);
