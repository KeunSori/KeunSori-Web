import { useState } from "react";
import NavBar3 from "../components/navBar/navBar3.tsx";
import DynamicTable from "../components/Manage/DynamicTable.tsx";
import ApprovalTable from "../components/Manage/ApprovalTable.tsx";
import styled from "@emotion/styled";

interface NavProps {
  isActive: boolean;
}

const ManagePage = () => {
  const [activeTab, setActiveTab] = useState("member");

  return (
    <>
      <Header>
        <NavBar3 />
      </Header>
      <Main>
        <ContentSection>
          <TabContainer>
            <Nav
              onClick={() => setActiveTab("member")}
              isActive={activeTab === "member"}
            >
              회원 관리
            </Nav>
            <Nav
              onClick={() => setActiveTab("approval")}
              isActive={activeTab === "approval"}
            >
              가입 승인
            </Nav>
          </TabContainer>
          <div>
            {activeTab === "member" && <DynamicTable />}
            {activeTab === "approval" && <ApprovalTable />}
          </div>
        </ContentSection>
      </Main>
    </>
  );
};

export default ManagePage;

// Header
const Header = styled.header``;

const Nav = styled.button<NavProps>`
  font-size: 17px;
  background-color: ${({ isActive }) => (isActive ? "#FFF4D5" : "transparent")};
  font-weight: 300;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  &:hover,
  &:active {
    background-color: #fff4d5;
  }
`;

// Main
const Main = styled.main`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 60px;
`;

const ContentSection = styled.section`
  width: 60%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

const TabContainer = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  border-bottom: 2px solid #f1f1f1;
  margin-bottom: 20px;
`;
