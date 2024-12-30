import { css } from "@emotion/css";
import Button from "../components/Button.tsx";
import logo from "../../public/logo.svg";
import { Link } from "react-router-dom";
import Input from "../components/Input.tsx";

const SignUpPage = () => {
  return (
    <>
      <div
        className={css`
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          gap: 1px;
        `}
      >
        <Link to="/">
          <img
            className={css`
              margin-top: 60px;
              margin-bottom: 10px;
              width: 130px;
            `}
            src={logo}
            alt="logo"
          />
        </Link>
        <Input placeholder="이름"></Input>
        <Input placeholder="학번"></Input>
        <Input placeholder="비밀번호"></Input>
        <Input placeholder="비밀번호 확인"></Input>
        <div
          className={css`
            height: 2px;
          `}
        ></div>
        <Button>큰소리 회원가입</Button>
      </div>
    </>
  );
};
export default SignUpPage;
