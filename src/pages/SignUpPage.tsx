// external
import { Link } from "react-router-dom";

// internal
import logo from "/image/logo.svg";
import SignUpForm from "@/components/SignUpPage/SignUpForm.tsx";
import { Helmet } from "react-helmet";
import {
  Main,
  Logo,
  Notice,
} from "@/styles/Auth/PageStyle";

const SignUpPage = () => {
  return (
    <>
      <Helmet>
        <title>
          큰소리 – 홍익대 컴퓨터공학과
          밴드학회(컴공)
        </title>
        <meta
          name="description"
          content="홍익대학교 컴퓨터공학과 밴드학회 '큰소리'는 음악을 사랑하는 컴공인을 위한 밴드 동아리입니다."
        />
        <meta
          name="description"
          content="큰소리 밴드학회 신규 회원가입 페이지입니다. 가입 후 관리자의 승인을 기다려주세요!"
        />
        <meta
          property="og:title"
          content="회원가입 – 큰소리 밴드학회"
        />
        <meta
          property="og:description"
          content="홍익대 컴퓨터공학과 밴드학회 '큰소리'의 신규 회원가입 페이지입니다."
        />
        <meta
          property="og:image"
          content="https://keunsori.com/image/logo.svg"
        />
        <meta
          property="og:url"
          content="https://keunsori.com/signup"
        />
        <meta
          property="og:type"
          content="website"
        />
      </Helmet>
      <Main>
        <Link to="/login">
          <Logo src={logo} alt="logo" />
        </Link>

        {/* 회원 가입 폼 */}
        <SignUpForm />

        <Notice>
          * 가입 승인이 될 때까지 며칠 시간이
          소요될 수 있습니다.
        </Notice>
      </Main>
    </>
  );
};

export default SignUpPage;
