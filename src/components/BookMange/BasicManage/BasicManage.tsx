import styled from "@emotion/styled";
import { css } from "@emotion/css";
import Container from "../Container";
import DayNotion from "./DayNotion";
import authApi from "../../../api/Instance/authApi.ts";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { weekDataAtom } from "./weekData";
import ManageModal from "../ManageModal.tsx";

const BasicManage: React.FC = () => {
  const [weekData, setWeekData] = useAtom(weekDataAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fetchData = async () => {
    try {
      const response = await authApi.get(`/admin/reservation/weekly-schedule`);

      setWeekData(response.data);
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
              display: flex;
              align-items: center;
              gap: 10px;
            `}
          >
            <DayNotion date={date} />
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
