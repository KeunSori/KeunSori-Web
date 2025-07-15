// libraries
import { useState } from "react";

// shared
import Footer from "@/styles/Footer";
import NavBar2 from "@/components/navBar/navBar2";

// this
import {
  Container,
  Title,
  ContentBox,
  ChangeButton,
  ButtonDiv,
} from "@/components/PasswordChange/PasswordChangeStyles";
import PasswordForm from "@/components/PasswordChange/PasswordForm";

const PasswordChange = () => {
  // '변경하기' 버튼 비활성화 여부
  const [isDisabled, setIsDisabled] = useState(true);

  return (
    <>
      <NavBar2 />
      <Container>
        <ContentBox>
          <Title>비밀번호 변경</Title>
          <PasswordForm setIsDisabled={setIsDisabled} />
          <ButtonDiv>
            <ChangeButton
              className={isDisabled ? "gray" : "orange"}
              // onClick={handlePasswordChange} 대신에 ..
              onClick={() =>
                document.getElementById("password-form-submit")?.click()
              }
              disabled={isDisabled}
            >
              변경하기
            </ChangeButton>
          </ButtonDiv>
        </ContentBox>
      </Container>
      <Footer />
    </>
  );
};
export default PasswordChange;
