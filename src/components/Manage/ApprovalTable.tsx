import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import axiosInstance from "../../api/axiosInstance";
///import { fetchRows } from "./api"; // API 요청 분리된 파일

interface applicantResponse {
  id: number;
  name: string;
  StudentId: string;
  status: string;
  applicationDate: number[];
}
// api test
const fetchApplicants = async (): Promise<applicantResponse[]> => {
  const response = await axiosInstance.get<applicantResponse[]>(
    "/admin/members/applicants"
  );
  return response.data;
};

interface Row {
  id: number;
  name: string;
  StudentId: string;
  date: Date; // 서버에서 날짜를 문자열로 전달한다고 가정
  checked?: boolean;
}

const TableContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #e6e8ea;
`;

const TableHeadCell = styled.th`
  padding: 10px;
  text-align: center;
  font-weight: bold;
`;

const TableCell = styled.td`
  padding: 10px;
  text-align: center;
`;

const ActionButton = styled.button`
  background-color: #ffaa00;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  margin-left: auto;

  &:hover {
    background-color: #e69900;
  }
`;

const ApprovalTable: React.FC = () => {
  const [rows, setRows] = useState<Row[]>([]);

  // 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const members = await fetchApplicants();
        console.log(members);

        const resultRows = members.map((item) => ({
          ...item,
          checked: false,
          date: new Date(
            item.applicationDate[0],
            item.applicationDate[1] - 1,
            item.applicationDate[2],
            item.applicationDate[3],
            item.applicationDate[4],
            item.applicationDate[5],
            Math.floor(item.applicationDate[6] / 1_000_000)
          ),
        }));

        setRows(resultRows);
      } catch (error) {
        console.error("Fetch Error: ", error);
      }
    };

    fetchData();
  }, []);

  // 체크박스 상태 변경
  const handleCheckboxChange = (id: number) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, checked: !row.checked } : row
      )
    );
  };

  const ApproveComplete = async () => {
    try {
      // ✅ 체크된 행들의 ID 목록 가져오기
      const selectedIds = rows
        .filter((row) => row.checked)
        .map((row) => row.id);

      if (selectedIds.length === 0) {
        alert("승인할 항목을 선택하세요.");
        return;
      }

      console.log("승인 요청 보낼 ID 목록:", selectedIds);

      // ✅ 비동기 요청을 병렬로 실행 (Promise.all)
      await Promise.all(
        selectedIds.map(async (id) => {
          try {
            const response = await axiosInstance.patch(
              `/admin/members/${id}/approve`
            );
            if (response.status !== 200) {
              throw new Error(`승인 실패 (ID: ${id})`);
            }
          } catch (error) {
            console.error(`ID ${id} 승인 실패:`, error);
          }
        })
      );

      // ✅ 요청 성공한 ID들을 rows 상태에서 제거
      setRows((prevRows) =>
        prevRows.filter((row) => !selectedIds.includes(row.id))
      );

      alert("승인이 완료되었습니다.");
    } catch (error) {
      console.error("승인 요청 실패:", error);
    }
  };

  return (
    <TableContainer>
      <Table>
        <thead>
          <TableRow>
            <TableHeadCell>
              <input type="checkbox" disabled />
            </TableHeadCell>
            <TableHeadCell>번호</TableHeadCell>
            <TableHeadCell>이름</TableHeadCell>
            <TableHeadCell>학번</TableHeadCell>
            <TableHeadCell>가입 신청일</TableHeadCell>
          </TableRow>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <TableRow key={row.id}>
              <TableCell>
                <input
                  type="checkbox"
                  checked={row.checked || false}
                  onChange={() => handleCheckboxChange(row.id)}
                />
              </TableCell>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.StudentId}</TableCell>
              <TableCell>{row.date.toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      <ActionButton onClick={ApproveComplete}>가입 승인</ActionButton>
    </TableContainer>
  );
};

export default ApprovalTable;
