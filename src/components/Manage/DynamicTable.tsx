import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import authApi from "../../api/Instance/authApi";
import ManageModal from "./ManageModal";
///import { fetchRows } from "./api"; // API 요청 분리된 파일

interface memberResponse {
  id: number;
  name: string;
  StudentId: string;
  status: string;
  approvalDate: number[];
}

interface Row {
  id: number;
  name: string;
  StudentId: string;
  date: Date; // 서버에서 날짜를 문자열로 전달한다고 가정
  checked?: boolean;
}

type SortKeys = "name" | "StudentId" | "date";
type SortDirection = "asc" | "desc";

const fetchMembers = async (): Promise<memberResponse[]> => {
  const response = await authApi.get<memberResponse[]>("/admin/members/list");
  return response.data;
};

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

const TableHeadCell = styled.th<{ isActive: boolean}>`
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

const Scroll = styled.div`
  @media (max-width: 768px) {
    height: 500px;
  }
  overflow: auto;
`;

const DynamicTable: React.FC = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [sortKey, setSortKey] = useState<SortKeys>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const members = await fetchMembers();

        const resultRows = members.map((item) => {
          const dateArray = item.approvalDate || [2002, 1, 4, 0, 0, 0, 0];

          return {
            ...item,
            checked: false,
            date: new Date(
              dateArray[0],
              dateArray[1] - 1,
              dateArray[2],
              dateArray[3],
              dateArray[4],
              dateArray[5],
              Math.floor(dateArray[6] / 1_000_000)
            ),
          };
        });

        setRows(resultRows);
        sortMembers(rows, sortKey, sortDirection);
      } catch (error) {
        console.error("Fetch error: ", error);
      }
    };

    fetchData();
  }, []);

  // 정렬
  const sortMembers = (data: Row[], key: SortKeys, direction: SortDirection) => {
    return [...data].sort((a, b) => {
      const multiplier = direction === "asc" ? 1 : -1;
      if (key === "name") return a.name.localeCompare(b.name) * multiplier;
      if (key === "date")
        return new Date(a.date).getTime() - new Date(b.date).getTime() * multiplier;
      if (key === "StudentId") return a.StudentId.localeCompare(b.StudentId) * multiplier;
      return 0;
    });
  };

  // 테이블 헤더 클릭 시 정렬 변경
  const handleSort = (key: SortKeys) => {
    let newDirection: SortDirection = "asc";

    if (sortKey === key) {
      newDirection = sortDirection === "asc" ? "desc" : "asc";
    }
      
    setSortKey(key);
    setSortDirection(newDirection);
    setRows(sortMembers(rows, key, newDirection));
  }

  // 체크박스 상태 변경
  const handleCheckboxChange = (id: number) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, checked: !row.checked } : row
      )
    );
  };

  const handleDelete = async () => {
    try {
      const selectedIds = rows
        .filter((row) => row.checked)
        .map((row) => row.id);

      if (selectedIds.length === 0) {
        alert("항목을 하나 이상 선택하세요.");
        return;
      }

      console.log("탈퇴 요청 보낼 ID 목록:", selectedIds);

      await Promise.all(
        selectedIds.map(async (id) => {
          try {
            const response = await authApi.delete(`/admin/members/${id}`);
            if (response.status === 204) {
              console.log("탈퇴 처리 성공");
            } else {
              throw new Error(`탈퇴 처리 실패 (ID: ${id})`);
            }
          } catch (error) {
            console.error(`ID ${id} 탈퇴 처리 실패:`, error);
          }
        })
      );
    } catch (error) {
      console.error("탈퇴 처리 실패:", error);
    }

    window.location.href = "/member-management";
  };

  return (
    <TableContainer>
      <Scroll>
        <Table>
          <thead>
            <TableRow>
              <TableHeadCell isActive={false}>
                <input type="checkbox" disabled />
              </TableHeadCell>
              <TableHeadCell isActive={sortKey === "name"} onClick={() => handleSort("name")}>
                이름 {sortKey === "name" && (sortDirection === "asc" ? "↑" : "↓")}</TableHeadCell>
              <TableHeadCell isActive={sortKey === "StudentId"} onClick={() => handleSort("StudentId")}>
                학번 {sortKey === "StudentId" && (sortDirection === "asc" ? "↑" : "↓")}</TableHeadCell>
              <TableHeadCell isActive={sortKey === "date"} onClick={() => handleSort("date")}>
                가입일 {sortKey === "date" && (sortDirection === "asc" ? "↑" : "↓")}</TableHeadCell>
            </TableRow>
          </thead>
          <tbody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <input
                    type="checkbox"
                    checked={row.checked || false}
                    onChange={() => handleCheckboxChange(row.id)}
                  />
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.StudentId}</TableCell>
                <TableCell>{row.date.toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </Scroll>
      <ActionButton onClick={() => setIsModalOpen(true)}>
        탈퇴 처리
      </ActionButton>
      {isModalOpen && (
        <ManageModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onDelete={handleDelete}
        />
      )}
    </TableContainer>
  );
};

export default DynamicTable;
