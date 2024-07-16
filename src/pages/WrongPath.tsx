import { useNavigate } from "react-router-dom";
import { cn } from "../utilis";

export default function WrongPath() {
  const navigate = useNavigate();

  return (
    <>
      <header
        className={cn("bg-[#512689] text-white flex flex-col items-center")}
      >
        <div
          className={cn(
            "w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%]",
            "py-8",
            "flex flex-col gap-4",
            "relative"
          )}
        >
          <button
            className={cn(
              "border-[1px] border-white px-4 py-1 rounded-md self-center"
            )}
            onClick={() => navigate("/")}
          >
            Вернуться на главную
          </button>
        </div>
      </header>
      <div className="flex flex-col items-center py-8">
        <h1 className="text-bold text-6xl">404</h1>
      </div>
    </>
  );
}
