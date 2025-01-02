import { css } from "@emotion/css";
import NavBar2 from "../components/navBar/navBar2.tsx";
import styled from "@emotion/styled";
import CurrentBook from "../components/Book/CurrentBook.tsx";
const Nav = styled.div`
  font-size: 17px;
  font-weight: 300;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  &:hover,
  &:active {
    background-color: #ffe493;
  }
`;
const BookPage = () => {
  return (
    <>
      <NavBar2 />
      <div
        className={css`
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          margin-top: 80px;
        `}
      >
        <div
          className={css`
            display: flex;
            gap: 20px;
            width: 60%;
            border-bottom: 2px solid #f1f1f1;
            margin-bottom: 20px;
          `}
        >
          <Nav>예약 현황</Nav>
          <Nav>예약 신청</Nav>
          <Nav>나의 예약</Nav>
        </div>
        <CurrentBook />
      </div>
    </>
  );
};
export default BookPage;
