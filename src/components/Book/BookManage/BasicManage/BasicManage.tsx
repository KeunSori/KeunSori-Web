import styled from "@emotion/styled";
import { css } from "@emotion/css";
import Container from "@/components/Book/BookManage/Container.ts";
import DayNotion from "@/components/Book/BookManage/BasicManage/DayNotion.tsx";
import authApi from "@/api/Instance/authApi.ts";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { weekDataAtom } from "@/store/weekData.ts";
import ManageModal from "@/components/Book/BookManage/ManageModal.tsx";
import BookByWeek from "./BookByWeek";

const BasicManage: React.FC = () => {
  const [weekData, setWeekData] = useAtom(weekDataAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fetchData = async () => {
    try {
      const response = await authApi.get(`/admin/reservation/weekly-schedule`);

      setWeekData(response.data);
      console.log(weekData);
    } catch (error) {
      console.log(`에러남:${error}`);
      alert("정보를 불러올 수 없습니다");
    }
  };
  const handleSubmit = async () => {
    try {
      await authApi.put(`/admin/reservation/weekly-schedule`, weekData);
      window.location.reload();
    } catch (error) {
      console.log(`에러남:${error}`);
      alert("정보를 불러올 수 없습니다");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Container>
        {weekData.map((date) => (
          <div
            key={date.dayOfWeekNum}
            className={css`
              // border: 1px solid black;
              width: 750px;
              display: flex;
              flex-direction: column;
              gap: 10px;
            `}
          >
            <DayNotion date={date} />
            <BookByWeek date={date} />
          </div>
        ))}
        <SumbmitButton onClick={() => setIsModalOpen(true)}>저장</SumbmitButton>
      </Container>
      {isModalOpen && (
        <ManageModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onStore={handleSubmit}
        />
      )}
    </>
  );
};
export default BasicManage;
const SumbmitButton = styled.button`
  width: 100px;
  padding: 5px;
  color: black;
  margin-top: 10px;
  border-radius: 5px;
  cursor: pointer;
  background-color: #ffefbe;
  &:hover {
    background-color: #ffc927;
    color: white;
  }
`;
