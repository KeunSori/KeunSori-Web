import { UserInfo } from "../../../data/user.ts";
import { useEffect, useState } from "react";
import authApi from "../../../api/Instance/authApi.ts";
import NotionCard from "../../Book/My/NotionCard.tsx";

interface ManageNotionProps {
  user: UserInfo;
}
const ManageNotion: React.FC<ManageNotionProps> = ({ user }) => {
  const [instrument, setInstrument] = useState<string>("");

  const TransDate = (userDate: string) => {
    return `${userDate[0].toString()}/${userDate[1].toString()}/${userDate[2].toString()}`;
  };

  const TransInstrument = (session: string) => {
    if (session == "vocal") {
      setInstrument("보컬");
    } else if (session == "guitar") {
      setInstrument("기타");
    } else if (session == "bass") {
      setInstrument("베이스");
    } else if (session == "keyboard") {
      setInstrument("키보드");
    } else if (session == "drum") {
      setInstrument("드럼");
    } else {
      setInstrument("합주");
    }
  };
  const [date, setDate] = useState<Date | null>(null);

  const handleDelete = async () => {
    await authApi.delete(`/admin/reservation/${user.reservationId}`);
    window.location.reload();
  };
  useEffect(() => {
    TransInstrument(user.reservationSession);
    setDate(new Date(TransDate(user.reservationDate)));
  }, []);
  return (
    <>
      <NotionCard
        user={user}
        instrument={instrument}
        date={date}
        onDelete={handleDelete}
      />
    </>
  );
};
export default ManageNotion;
