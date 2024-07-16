import {
  fetchTeam,
  increaseLimit,
  setCurrentPage,
} from "../store/slices/teamSlice";
import { cn } from "../utilis";
import Card from "../components/Card";
import type { TeamMember } from "../types";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useCookies } from "react-cookie";
import { deleteToken } from "../store/slices/formSlice";
import { persistor } from "../store/store";

export default function Catalog() {
  const { team, limit, current_page } = useAppSelector((state) => state.team);
  const dispatch = useAppDispatch();
  const [cookies, _, removeCookie] = useCookies(["token"]);

  function handleShowMore() {
    dispatch(increaseLimit(4));
    dispatch(setCurrentPage(1));
  }

  function handleExit() {
    removeCookie("token");
    dispatch(deleteToken());
    persistor.flush();
    dispatch(fetchTeam());
  }

  function computePages(pageAmount: number): number[] {
    let result = [];
    for (let i = 0; i < pageAmount; i++) {
      result.push(i + 1);
    }
    return result;
  }

  if (!cookies.token) {
    return <Navigate to="/signup" />;
  }

  return (
    <>
      <header className="bg-[#512689] flex justify-center py-8">
        <div
          className={cn(
            " text-white text-center flex flex-col gap-6 relative",
            "w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%]"
          )}
        >
          <button
            onClick={() => handleExit()}
            className={cn("self-end", "lg:hidden lg:absolute")}
          >
            {getout}
          </button>
          <button
            onClick={() => handleExit()}
            className={cn(
              "border-[1px] border-white px-4 py-1 rounded-md self-end",
              "absolute rigth-0 translate-x-[200%]",
              "hidden lg:block"
            )}
          >
            Выход
          </button>
          <h1 className="text-[36px] leading-[30px] lg:text-[64px] lg:leading-[50px]">
            Наша команда
          </h1>
          <p className="text-[16px] lg:text-[20px]">
            Это опытные специалисты, хорошо разбирающиеся во всех задачах,
            которые ложатся на их плечи, и умеющие находить выход из любых, даже
            самых сложных ситуаций.
          </p>
        </div>
      </header>
      <div
        className={cn(
          "flex flex-col m-auto py-8 gap-8",
          "w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%]"
        )}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2">
          {team &&
            team
              .filter(
                (t: TeamMember, index: number) =>
                  index >= (current_page - 1) * limit &&
                  index < limit * current_page &&
                  t
              )
              .map((t) => <Card key={t.id} {...t} />)}
        </div>
        <div className="flex justify-center gap-4">
          {computePages(Math.ceil(team.length / limit)).map((i) => (
            <span
              onClick={() => dispatch(setCurrentPage(i))}
              className={cn(
                "text-[#512689] font-bold cursor-pointer px-2 py-1",
                i === current_page && "bg-[#512689] rounded-md text-white"
              )}
              key={i}
            >
              {i}
            </span>
          ))}
        </div>
        <button
          disabled={limit >= team.length}
          onClick={() => handleShowMore()}
          className={cn(
            "border-[1px] border-black px-4 py-1 rounded-md self-center cursor-pointer",
            "disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-200",
            "flex items-center gap-2",
            "[&>*]:disabled:opacity-20"
          )}
        >
          Показать ещё {arrowdown}
        </button>
      </div>
    </>
  );
}

const arrowdown = (
  <svg
    width="18"
    height="10"
    viewBox="0 0 18 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.497 0.989027L8.99999 8.29703L1.50299 0.989027C1.36905 0.858193 1.18923 0.784947 1.00199 0.784947C0.814751 0.784947 0.634939 0.858193 0.500992 0.989027C0.436135 1.05257 0.384611 1.12842 0.349436 1.21213C0.314261 1.29584 0.296143 1.38573 0.296143 1.47653C0.296143 1.56733 0.314261 1.65721 0.349436 1.74092C0.384611 1.82463 0.436135 1.90048 0.500992 1.96403L8.47649 9.74003C8.61655 9.87655 8.8044 9.95295 8.99999 9.95295C9.19558 9.95295 9.38343 9.87655 9.52349 9.74003L17.499 1.96553C17.5643 1.90193 17.6162 1.8259 17.6517 1.74191C17.6871 1.65792 17.7054 1.56769 17.7054 1.47653C17.7054 1.38537 17.6871 1.29513 17.6517 1.21114C17.6162 1.12715 17.5643 1.05112 17.499 0.987526C17.365 0.856693 17.1852 0.783447 16.998 0.783447C16.8108 0.783447 16.6309 0.856693 16.497 0.987526V0.989027Z"
      fill="#151317"
    />
  </svg>
);

const getout = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.79 13.29C8.18 13.68 8.81 13.68 9.2 13.29L12.79 9.7C12.8827 9.60749 12.9563 9.4976 13.0064 9.37662C13.0566 9.25565 13.0824 9.12597 13.0824 8.995C13.0824 8.86403 13.0566 8.73435 13.0064 8.61338C12.9563 8.4924 12.8827 8.38251 12.79 8.29L9.2 4.7C9.01302 4.51302 8.75943 4.40798 8.495 4.40798C8.23057 4.40798 7.97698 4.51302 7.79 4.7C7.60302 4.88698 7.49798 5.14057 7.49798 5.405C7.49798 5.66943 7.60302 5.92302 7.79 6.11L9.67 8H1C0.45 8 0 8.45 0 9C0 9.55 0.45 10 1 10H9.67L7.79 11.88C7.4 12.27 7.41 12.91 7.79 13.29ZM16 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V5C0 5.55 0.45 6 1 6C1.55 6 2 5.55 2 5V3C2 2.45 2.45 2 3 2H15C15.55 2 16 2.45 16 3V15C16 15.55 15.55 16 15 16H3C2.45 16 2 15.55 2 15V13C2 12.45 1.55 12 1 12C0.45 12 0 12.45 0 13V16C0 17.1 0.9 18 2 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0Z"
      fill="#F8F8F8"
    />
  </svg>
);
