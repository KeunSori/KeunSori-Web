import { useState } from "react";
import NavBar3 from "../components/navBar/navBar3.tsx";
import { css } from "@emotion/css";
import DynamicTable from "../components/Manage/DynamicTable.tsx";
import ApprovalTable from "../components/Manage/ApprovalTable.tsx";
import styled from "@emotion/styled";
interface NavProps {
  isActive: boolean;
}
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

const containerStyle = css`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 80px;
`;

const tabStyle = css`
  display: flex;
  gap: 20px;
  width: 100%;
  border-bottom: 2px solid #f1f1f1;
  margin-bottom: 20px;
`;

const ManagePage = () => {
  const [activeTab, setActiveTab] = useState("member");

  return (
    <>
      <NavBar3 />
      <div className={containerStyle}>
        <div
          className={css`
            width: 60%;
            display: flex;
            justify-content: center;
            flex-direction: column;
            @media (max-width: 768px) {
              width: 80%;
            }
          `}
        >
          <div className={tabStyle}>
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
          </div>
          <div className={css``}>
            {activeTab === "member" && <DynamicTable />}
            {activeTab === "approval" && <ApprovalTable />}
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagePage;
