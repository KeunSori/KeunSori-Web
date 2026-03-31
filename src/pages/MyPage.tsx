// libraries
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// shared
import NavBar2 from "@/components/navBar/navBar2";
import Footer from "@/styles/Footer.tsx";
import authApi from "@/api/Instance/authApi.ts";

// this
import {
  ReserveView,
  Container,
  InfoBox,
  Title,
  Information,
  Flex,
  FlexWrap,
  Logout,
  Text,
} from "@/components/Mypage/MyPageStyles.tsx";

import { AuthContext } from "@/contexts/AuthContext.tsx";

interface UserInfo {
  name: string;
  studentId: string;
  email: string;
}

const MyPage = () => {
  // 회원 정보
  const [info, setInfo] = useState<UserInfo>({
    name: "",
    studentId: "",
    email: "",
  });

  const nav = useNavigate();
  const navToLogin = () => nav("/login");
  const navToPassChange = () => nav("/password-change"); // '비밀번호 변경하기' 클릭 시 이동
  const navToBook = () => nav("/book?type=my"); // '내 예약 조회' 클릭 시 이동

  const authContext = useContext(AuthContext);

  useEffect(() => {
    async function fetchPersonData() {
      try {
        if (authContext.user.memberStatus === "일반") {
          const response = await authApi.get<UserInfo>("/members/me");
          setInfo(response.data);
        } else if (authContext.user.memberStatus === "관리자") {
          const response = await authApi.get<UserInfo>("/admin/me");
          setInfo(response.data);
        } else {
          alert("로그인이 필요합니다.");
          nav("/login");
        }
      } catch (e) {
        console.error(e);
        alert("마이페이지 정보를 불러오는데 실패했습니다.");
        nav("/login");
      }
    }
    fetchPersonData();
  }, []); // 페이지 랜더링 시 한번 실행

  return (
    <>
      <NavBar2 />
      <Container>
        <InfoBox>
          <Title>계정관리</Title>
          <FlexWrap>
            <Information>
              <Flex>
                <Text className="gray">이름</Text>
                <Text>{info.name || "정보 없음"}</Text>
              </Flex>
              <Flex>
                <Text className="gray">학번</Text>
                <Text>{info.studentId || "정보 없음"}</Text>
              </Flex>
              <Flex className="email">
                <Text className="gray">이메일</Text>
                <Text>{info.email || "정보 없음"}</Text>
              </Flex>
              <Text className="gray-line" onClick={navToPassChange}>
                비밀번호 수정하기
              </Text>
            </Information>
            <Logout onClick={navToLogin}>로그아웃</Logout>
          </FlexWrap>
        </InfoBox>
        <ReserveView onClick={navToBook}>내 예약 조회</ReserveView>
      </Container>
      <Footer />
    </>
  );
};
export default MyPage;
