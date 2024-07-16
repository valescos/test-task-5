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
      <div>
        <label htmlFor="pass">Пароль</label>
        <input
          className={cn(
            "rounded-md",
            errors.password && "border-rose-600 border-2"
          )}
          id="pass"
          type="password"
          value={password}
          onChange={(e) => dispatch(setPassword(e.target.value))}
        />
        {errors.password && (
          <p className="text-rose-600 font-bold text-sm -mt-2">
            Пароль должен состоять минимум из шести символов
          </p>
        )}
      </div>
      <div>
        <label htmlFor="pass_confirm">Подтвердите пароль</label>
        <input
          className={cn(
            "rounded-md",
            errors.confirm_password && "border-rose-600 border-2"
          )}
          id="pass_confirm"
          type="password"
          value={confirm_password}
          onChange={(e) => dispatch(setConfirmPassword(e.target.value))}
        />
        {errors.confirm_password && (
          <p className="text-rose-600 font-bold text-sm -mt-2">
            Пароль не совпадает с подтверждением
          </p>
        )}
      </div>
      <button className="bg-[#512689] px-4 py-2 text-white text-center rounded-md">
        Зарегистрироваться
      </button>
    </form>
  );
}
