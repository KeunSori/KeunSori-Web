import { css } from "@emotion/css";
import "react-calendar/dist/Calendar.css";
import MyNotion from "./MyNotion.tsx";
import authApi from "../../../api/Instance/authApi.ts";
import { useEffect, useState } from "react";
import { UserInfo } from "../../../data/user.ts";
import { InstrumentDropBox, TeamDropBox } from "../Application/DropBox.tsx";
import OutContainer from "../OutContainer.tsx";
import { useNavigate } from "react-router-dom";

const MyBook: React.FC = () => {
  const [team, setTeam] = useState(false);
  const [individual, setIndividual] = useState(false);
  const [instrument, setInstrument] = useState<string>("");
  const navigate = useNavigate();

  const onTeamClick = (value: string) => {
    if (value === "팀") {
      setTeam(true);
      setIndividual(false);
      setInstrument("");
    } else if (value === "개인") {
      setTeam(false);
      setIndividual(true);
    } else {
      setTeam(false);
      setIndividual(false);
      setInstrument("");
    }
  };
  const onInstrumentClick = (value: string) => {
    if (value === "보컬") {
      setInstrument("vocal");
    } else if (value === "기타") {
      setInstrument("guitar");
    } else if (value === "베이스") {
      setInstrument("bass");
    } else if (value === "드럼") {
      setInstrument("drum");
    } else if (value === "키보드") {
      setInstrument("keyboard");
    } else {
      setInstrument("");
    }
  };
  const [userData, setUserData] = useState<UserInfo[] | null>(null);

  async function fetchData() {
    try {
      const response = await authApi.get("/reservation/my");
      setUserData(response.data);
    } catch (e) {
      console.error(e);
      alert("예약 정보를 불러오는데 실패했습니다.");
      navigate("/login");
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <OutContainer>
        <div
          className={css`
            width: 100%;
            position: relative;
            display: flex;
            align-items: center;
            margin-bottom: 20px;
          `}
        >
          <TeamDropBox onClick={onTeamClick} />
          {individual && <InstrumentDropBox onClick={onInstrumentClick} />}
        </div>
        <div
          className={css`
            padding: 5px;
            margin: 20px 0px;
            display: flex;
            justify-content: flex-start;
            width: 100%;
            flex-wrap: wrap;
            align-content: flex-start;
            gap: 30px;
          `}
        >
          {userData?.map((user) =>
            team ? (
              user.reservationType === "TEAM" && (
                <MyNotion key={user.reservationId} user={user} />
              )
            ) : individual ? (
              instrument ? (
                instrument === user.reservationSession && (
                  <MyNotion key={user.reservationId} user={user} />
                )
              ) : (
                user.reservationType !== "team" && (
                  <MyNotion key={user.reservationId} user={user} />
                )
              )
            ) : (
              <MyNotion key={user.reservationId} user={user} />
            )
          )}
        </div>
      </OutContainer>
    </>
  );
};

export default MyBook;
