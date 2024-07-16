import { fetchTeam } from "../store/slices/teamSlice";
import { cn } from "../utilis";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import type { TeamMember } from "../types";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";

export default function Catalog() {
  const { team } = useAppSelector((state) => state.team);
  const dispatch = useAppDispatch();
  const [limit, setLimit] = useState(4);
  const [pages, setPages] = useState(1);

  const cookie = true;

  useEffect(() => {
    dispatch(fetchTeam());
  }, []);

  function handleShowMore() {
    setLimit(limit + 4);
    setPages(1);
  }

  function computePages(pageAmount: number): number[] {
    let result = [];
    for (let i = 0; i < pageAmount; i++) {
      result.push(i + 1);
    }
    return result;
  }

  if (!cookie) {
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
            className={cn(
              "border-[1px] border-white px-4 py-1 rounded-md self-end",
              "absolute rigth-0 translate-x-[200%]"
            )}
          >
            Выход
          </button>
          <h1 className="text-[64px] leading-[50px]">Наша команда</h1>
          <p className="text-[20px]">
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
                  index >= (pages - 1) * limit && index < limit * pages && t
              )
              .map((t) => <Card key={t.id} {...t} />)}
        </div>
        <div className="flex justify-center gap-4">
          {computePages(Math.ceil(team.length / limit)).map((i) => (
            <span
              onClick={() => setPages(i)}
              className={cn(
                "text-[#512689] font-bold cursor-pointer px-2 py-1",
                i === pages && "bg-[#512689] rounded-md text-white"
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
            "flex items-center gap-2"
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
