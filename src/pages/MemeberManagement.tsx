import { useState } from 'react';
import NavBar2 from "../components/navBar/navBar2.tsx";
import { css } from "@emotion/css";
import DynamicTable from '../components/DynamicTable.tsx';

const containerStyle = css`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 80px;
`;

const MemberManagement = () => {
    const [activeTab, setActiveTab] = useState('member');

    return (
        <>
            <NavBar2 />
            <div className={containerStyle}>
            <div className="tabs">
                <button onClick={() => setActiveTab('member')}>회원 관리</button>
                <button onClick={() => setActiveTab('approval')}>가입 승인</button>
            </div>
            <div className="tab-content">
                {activeTab === 'member' && <DynamicTable />}
                {activeTab === 'approval' && <div>가입 승인 내용</div>}
            </div>
            </div>
        </>
    );
};

export default MemberManagement;
