import { cn } from "../utilis";

export default function SignUpForm() {
  return (
    <form
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
        <input id="username" type="text" />
      </div>
      <div>
        <label htmlFor="email">Электронная почта</label>
        <input id="email" type="email" />
      </div>
      <div>
        <label htmlFor="pass">Пароль</label>
        <input id="pass" type="password" />
      </div>
      <div>
        <label htmlFor="pass_confirm">Подтвердите пароль</label>
        <input id="pass_confirm" type="password" />
      </div>
      <button className="bg-[#512689] px-4 py-2 text-white text-center rounded-md">
        Зарегистрироваться
      </button>
    </form>
  );
}
