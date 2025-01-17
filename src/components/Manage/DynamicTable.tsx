import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
//import axios from "axios";
///import { fetchRows } from "./api"; // API 요청 분리된 파일

// 테스트용 Date 객체
const date_1 = new Date("2002-01-04");
const date_2 = new Date("2003-06-10");
const date_3 = new Date("2003-08-07");
//

const testInput = [
  { name: "김지상", username: "Emithen", date: date_1 },
  { name: "김유진", username: "sophia22001", date: date_2 },
  { name: "이주희", username: "leejuhi", date: date_3 },
];

function fetchRows(): Omit<Row, "id" | "checked">[] {
  return testInput;
}

interface Row {
  id: number;
  name: string;
  username: string;
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

const DynamicTable: React.FC = () => {
  const [rows, setRows] = useState<Row[]>([]);

  // 데이터 불러오기
  useEffect(() => {
    const loadData = async () => {
      try {
        const data: Omit<Row, "id" | "checked">[] = await fetchRows();
        const processedData = data.map((item, index: number) => ({
          ...item,
          id: index + 1,
          checked: false, // 초기 체크 상태 추가
        }));
        setRows(processedData);
      } catch (error) {
        console.error("데이터 로드 실패:", error);
      }
    };

    loadData();
  }, []);

  // 체크박스 상태 변경
  const handleCheckboxChange = (id: number) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, checked: !row.checked } : row
      )
    );
  };

  // 선택된 항목 삭제
  const handleDelete = () => {
    setRows((prevRows) => prevRows.filter((row) => !row.checked));
  };

  /*

  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(`/members/${id}`);
      if (response.status === 200) {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      }
    } catch (error) {
      console.error("삭제 실패:", error);
    }
  };

  **/

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
            <TableHeadCell>아이디</TableHeadCell>
            <TableHeadCell>가입일</TableHeadCell>
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
              <TableCell>{row.username}</TableCell>
              <TableCell>{row.date.toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      <ActionButton onClick={handleDelete}>탈퇴 처리</ActionButton>
    </TableContainer>
  );
};

export default DynamicTable;
