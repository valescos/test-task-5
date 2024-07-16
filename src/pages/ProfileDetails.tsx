import { Navigate, useNavigate, useParams } from "react-router-dom";
import type { TeamMember } from "../types";
import { cn } from "../utilis";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useCookies } from "react-cookie";
import { deleteToken } from "../store/slices/formSlice";

export default function ProfileDetails() {
  const { team } = useAppSelector((state) => state.team);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [cookies, _, removeCookie] = useCookies(["token"]);

  const targetUser = team.find((t: TeamMember) => t.id === Number(id));

  function handleExit() {
    removeCookie("token");
    dispatch(deleteToken());
  }

  if (!cookies.token) {
    return <Navigate to="/signup" />;
  }

  if (targetUser) {
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
                "border-[1px] border-white px-4 py-1 rounded-md",
                "absolute left-0 -translate-x-[200%]"
              )}
              onClick={() => navigate("/")}
            >
              Назад
            </button>
            <button
              onClick={() => handleExit()}
              className={cn(
                "border-[1px] border-white px-4 py-1 rounded-md",
                "absolute right-0 translate-x-[200%]"
              )}
            >
              Выход
            </button>
            <div className="flex gap-8 items-center">
              <img
                src={targetUser.avatar}
                alt=""
                className="rounded-full size-48 object-cover"
              />
              <div className="flex flex-col gap-2">
                <h2 className="text-6xl">
                  {targetUser.first_name} {targetUser.last_name}
                </h2>
                <p className="text-3xl font-light">Партнер</p>
              </div>
            </div>
          </div>
        </header>
        <div className="flex flex-col items-center py-8">
          <div
            className={cn(
              "w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%]",
              "flex gap-2"
            )}
          >
            <div className="order-2 min-w-[16rem]">
              <p className="flex gap-2 items-center justify-end pb-2">
                {phone} +7 (999) 666-99-66
              </p>
              <p className="flex gap-2 items-center justify-end">
                {mail} {targetUser.email}
              </p>
            </div>
            <p className="order-1">
              Клиенты видят в нем эксперта по вопросам разработки комплексных
              решений финансовых продуктов, включая такие аспекты, как
              организационная структура, процессы, аналитика и ИТ-компоненты. Он
              помогает клиентам лучше понимать структуру рисков их бизнеса,
              улучшать процессы за счет применения новейших технологий и
              увеличивать продажи, используя самые современные аналитические
              инструменты. В работе с клиентами недостаточно просто решить
              конкретную проблему или помочь справиться с трудностями. Не менее
              важно уделять внимание обмену знаниями: "Один из самых позитивных
              моментов — это осознание того, что ты помог клиенту перейти на
              совершенно новый уровень компетентности, уверенность в том, что
              после окончания проекта у клиента есть все необходимое, чтобы
              дальше развиваться самостоятельно". Помимо разнообразных проектов
              для клиентов финансового сектора, Сорин ведет активную
              предпринимательскую деятельность. Он является совладельцем сети
              клиник эстетической медицины в Швейцарии, предлагающей
              инновационный подход к красоте, а также инвестором других
              бизнес-проектов.
            </p>
          </div>
        </div>
      </>
    );
  }

  return <Navigate to="/error" />;
}

const phone = (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.55399 5.24003L6.17099 1.33503C5.78099 0.88503 5.06599 0.88703 4.61299 1.34103L1.83099 4.12803C1.00299 4.95703 0.765988 6.18803 1.24499 7.17503C4.10661 13.1 8.88503 17.8851 14.806 20.755C15.792 21.234 17.022 20.997 17.85 20.168L20.658 17.355C21.113 16.9 21.114 16.181 20.66 15.791L16.74 12.426C16.33 12.074 15.693 12.12 15.282 12.532L13.918 13.898C13.8482 13.9712 13.7562 14.0195 13.6563 14.0354C13.5564 14.0513 13.4541 14.0339 13.365 13.986C11.1354 12.7021 9.28598 10.8503 8.00499 8.61903C7.95702 8.52978 7.93964 8.42726 7.95554 8.32719C7.97144 8.22711 8.01972 8.13502 8.09299 8.06503L9.45299 6.70403C9.86499 6.29003 9.90999 5.65003 9.55399 5.23903V5.24003Z"
      stroke="#512689"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const mail = (
  <svg
    width="22"
    height="16"
    viewBox="0 0 22 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 0.5H2C1.60218 0.5 1.22064 0.658035 0.93934 0.93934C0.658035 1.22064 0.5 1.60218 0.5 2V14C0.5 14.3978 0.658035 14.7794 0.93934 15.0607C1.22064 15.342 1.60218 15.5 2 15.5H20C20.3978 15.5 20.7794 15.342 21.0607 15.0607C21.342 14.7794 21.5 14.3978 21.5 14V2C21.5 1.60218 21.342 1.22064 21.0607 0.93934C20.7794 0.658035 20.3978 0.5 20 0.5ZM18.35 2L11 7.085L3.65 2H18.35ZM2 14V2.6825L10.5725 8.615C10.698 8.7021 10.8472 8.74877 11 8.74877C11.1528 8.74877 11.302 8.7021 11.4275 8.615L20 2.6825V14H2Z"
      fill="#512689"
    />
  </svg>
);
