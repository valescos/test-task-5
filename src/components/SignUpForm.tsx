import { cn } from "../utilis";

export default function SignUpForm() {
  return (
    <form
      className={cn(
        "shadow-xl w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%]",
        "[&>div>input]:bg-[#F8F8F8]"
      )}
    >
      <h3>Регистрация</h3>
      <div>
        <label htmlFor="username">Имя</label>
        <input id="username" />
      </div>
      <div>
        <label htmlFor="email">Электронная почта</label>
        <input id="email" />
      </div>
      <div>
        <label htmlFor="pass">Пароль</label>
        <input id="pass" />
      </div>
      <div>
        <label htmlFor="pass_confirm">Подтвердите пароль</label>
        <input id="pass_confirm" />
      </div>
      <button>Зарегистрироваться</button>
    </form>
  );
}
