import { UserInfo } from "../../../data/user.ts";
import { useEffect, useState } from "react";
import authApi from "../../../api/Instance/authApi.ts";
import NotionCard from "../../Book/My/NotionCard.tsx";
import { transInstrument } from "../../../utils/instrumentUtils.ts";
import { transDate } from "../../../utils/dateUtils.ts";

interface ManageNotionProps {
  user: UserInfo;
}
const ManageNotion: React.FC<ManageNotionProps> = ({ user }) => {
  const [instrument, setInstrument] = useState<string>("");

  const TransInstrument = (session: string) => {
    setInstrument(transInstrument(session));
  };
  const [date, setDate] = useState<Date | null>(null);

  const handleDelete = async () => {
    await authApi.delete(`/admin/reservation/${user.reservationId}`);
    window.location.reload();
  };
  useEffect(() => {
    TransInstrument(user.reservationSession);
    setDate(new Date(transDate(user.reservationDate)));
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
