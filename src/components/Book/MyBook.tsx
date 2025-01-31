import { css } from "@emotion/css";
import "react-calendar/dist/Calendar.css";

import MyNotion from "./MyNotion";
import axiosInstance from "../../api/axiosInstance";
import { useEffect, useState } from "react";
import { UserInfo } from "../../data/user.ts";
import { InstrumentDropBox, TeamDropBox } from "./Application/DropBox.tsx";
import OutContainer from "./OutContainer.tsx";

const MyBook: React.FC = () => {
  const [team, setTeam] = useState(false);
  const [individual, setIndividual] = useState(false);
  const [instrument, setInstrument] = useState<string>("");

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
    console.log("props전달", value);
  };
  const [userData, setUserData] = useState<UserInfo[] | null>(null);

  async function fetchData() {
    const token = localStorage.getItem("accessToken");
    const response = await axiosInstance.get("/reservation/my", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUserData(response.data);
    console.log(response.data);
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
            align-items: center;
            justify-content: center;
            width: 100%;
            flex-wrap: wrap;
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
