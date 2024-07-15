import { useSelector, useDispatch } from "react-redux";
import { fetchTeam } from "../store/slices/teamSlice";
import { cn } from "../utilis";
import Card from "../components/Card";

export default function Catalog() {
  const { team } = useSelector((state) => state.team);
  const dispatch = useDispatch();

  return (
    <>
      <header className="bg-[#512689] flex justify-center py-8">
        <div
          className={cn(
            " text-white text-center flex flex-col gap-6",
            "w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%]"
          )}
        >
          <button className="self-end">Выход</button>
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
          {team && team.map((t) => <Card key={t.id} {...t} />)}
        </div>
        <button onClick={() => dispatch(fetchTeam())}>Показать ещё</button>
      </div>
    </>
  );
}
