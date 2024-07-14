import { useSelector, useDispatch } from "react-redux";
import { fetchTeam } from "../store/slices/teamSlice";

export default function Catalog() {
  const { team } = useSelector((state) => state.team);
  const dispatch = useDispatch();

  return (
    <>
      <header className="bg-[#512689] text-white text-center flex flex-col items-center">
        <button className="self-end">Выход</button>
        <h1>Наша команда</h1>
        <p>
          Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые
          ложатся на их плечи, и умеющие находить выход из любых, даже самых
          сложных ситуаций.
        </p>
      </header>
      <div>
        {team &&
          team.map((t) => (
            <div key={t.id}>
              <img src={t.avatar} alt="" className="rounded-full" />
              <p>
                {t.first_name} {t.last_name}
              </p>
            </div>
          ))}
      </div>
      <button onClick={() => dispatch(fetchTeam())}>Показать ещё</button>
    </>
  );
}
