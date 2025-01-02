import { css } from "@emotion/css";
import logo from "../../public/logo.svg";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
const Nav = styled.a`
  font-size: 22px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    color: white;
  }
`;

const Today = styled.div`
  font-size: 25px;
  font-weight: 500;
  box-sizing: border-box;
  border: none;
  &:hover,
  & :active {
    color: #ffaa00;
    border-bottom: 3px solid #ffaa00;
  }
`;
const UserPage = () => {
  return (
    <>
      <div
        className={css`
          display: flex;
          align-items: center;
          flex-direction: column;
          height: calc(50vh - 20px);
          width: 100%;
          background-color: white;
        `}
      >
        <Link to="/">
          <img
            className={css`
              margin: 10px;
              width: 60px;
              background-color: transparent;
            `}
            src={logo}
            alt="logo"
          />
        </Link>
        <div
          className={css`
            width: 100%;
            margin-top: 170px;
            margin-bottom: 20px;
            padding-left: 50px;
            font-size: 60px;
            font-weight: 500;
          `}
        >
          안녕하세요 학회원님!
        </div>
      </div>
      <div
        className={css`
          display: flex;
          align-items: center;
        `}
      >
        <div
          className={css`
            background-color: #f0f0f0;
            width: 50%;
            height: 3px;
          `}
        />
        <div
          className={css`
            width: 50%;
            height: 80px;
            background-color: #ffe187;
            display: flex;
            justify-content: space-around;
            padding: 10px;
            align-items: center;
          `}
        >
          <Link to="/book">
            <Nav>연습실</Nav>
          </Link>
          <Nav>게시판</Nav>
          <Nav>마이페이지</Nav>
        </div>
      </div>
      <div>
        <div
          className={css`
            display: flex;
            justify-content: space-around;
            width: 50%;
            padding: 0px 30px;
            font-size: 30px;
          `}
        >
          <Today>오늘의 예약</Today>
          <Today>오늘의 글</Today>
        </div>
      </div>
    </>
  );
};

export default UserPage;
