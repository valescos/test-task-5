import { useSelector, useDispatch } from "react-redux";
import { fetchTeam } from "../store/slices/teamSlice";
import { cn } from "../utilis";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import type { TeamMember } from "../types";

export default function Catalog() {
  const { team } = useSelector((state) => state.team);
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(4);
  const [pages, setPages] = useState(1);

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
            "disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-200"
          )}
        >
          Показать ещё
        </button>
      </div>
    </>
  );
}
