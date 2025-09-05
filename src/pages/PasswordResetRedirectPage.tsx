import { Link } from "react-router-dom";

import logo from "/image/logo.svg";
import PasswordResetRedirectForm from "../components/PasswordResetRedirect/PasswordResetRedirectForm";
import { Main, Logo, LinkText } from "@/styles/Auth/PageStyle";

const PasswordResetRedirectPage = () => {
    return (
        <>
        <Main>
            <Link to="/">
                <Logo src={logo} alt="logo" />
            </Link>
            
            {/* <PasswordResetForm /> */}
            <PasswordResetRedirectForm />
            <Link to="/login">
                <LinkText>로그인 하러가기</LinkText>
            </Link>
        </Main>
        </>
    );
}

export default PasswordResetRedirectPage;

