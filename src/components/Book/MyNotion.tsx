import { css } from "@emotion/css";
import styled from "@emotion/styled";
import axiosInstance from "../../api/axiosInstance";
import { useEffect } from "react";

const MyNotion: React.FC = () => {
  async function fetchData() {
    const token = localStorage.getItem("accessToken");
    const response = await axiosInstance.get("/reservation/my", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div
        className={css`
          display: flex;
          height: 400px;

          max-height: 100%;
          padding: 20px 0px;
          margin-top: 30px;
        `}
      >
        <Notion>
          김홍대<Title>악기</Title>
          <Detail>Guiter</Detail>
          <div
            className={css`
              display: flex;
              justify-content: space-between;
              padding-right: 30px;
              padding-bottom: 15px;
              border-bottom: 1px solid #f1f1f1;
            `}
          >
            <div>
              <Title>날짜</Title>
              <Detail>2025.01.01</Detail>
            </div>
            <div>
              <Title>시간</Title>
              <Detail>11:00 - 12:00</Detail>
            </div>
          </div>
          <div
            className={css`
              margin: 15px 0px;
              display: flex;
              justify-content: space-between;
              align-items: center;
            `}
          >
            <div
              className={css`
                font-weight: 700;
                color: #68ae82;
              `}
            >
              예약 완료
            </div>
            <div
              className={css`
                font-weight: 700;
                color: #bbc5d5;
                &:hover {
                  color: black;
                }
              `}
            >
              예약 취소
            </div>
          </div>
        </Notion>
      </div>
    </>
  );
};
export default MyNotion;
const Title = styled.div`
  font-size: 11px;
  font-weight: 300;
  margin-top: 15px;
  color: #7f8fa4;
`;
const Detail = styled.div`
  font-size: 14px;
  font-weight: 300;
  margin-top: 5px;
`;
const Notion = styled.div`
  width: 270px;
  max-width: 100%;
  height: 210px;
  border-radius: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
  padding: 20px;
  font-size: 15px;
  font-weight: 700;
`;
