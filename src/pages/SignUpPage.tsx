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
          height: 100vh;
          min-height: 100vh;
          margin-top: -5vh;
        `}
      >
        <Link to="/login">
          <img
            className={css`
              margin-top: 60px;
              margin-bottom: 10px;
              width: 210px;
              max-width: 90%;
              @media (max-width: 768px) {
                width: 150px;
                margin-top: 40px;
              }
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
