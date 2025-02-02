import { css } from "@emotion/css";
import logo from "/image/logo.svg";
import { Link } from "react-router-dom";
import SignUpForm from "../components/SignUp/SignUpForm.tsx";

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
        <Link to="/login">
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
        <SignUpForm />
      </div>
    </>
  );
};
export default SignUpPage;
