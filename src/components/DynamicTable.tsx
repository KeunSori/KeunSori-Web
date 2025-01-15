import { useState } from "react";

interface Row {
    name: string;
    id: string;
    date: Date;
}

// 테스트용 Date 객체
const date_1 = new Date("2002-01-04");
const date_2 = new Date("2003-08-07");
const date_3 = new Date("2003-06-10");
//

// const Today = new Date();

function DynamicTable() {
    const [rows] = useState<Row[]>([    // setRows 는 CRUD 구현할 때 추가할 예정
        { name: "김지상", id: "Emithen", date: date_1},
        { name: "이주희", id: "leejuhi", date: date_2},
        { name: "김유진", id: "sophia22001", date: date_3},
    ]);

    /*
    // 새 행 추가 함수
    const addRow = () => {
        setRows([
            ...rows,
            { name: "New Name", id: "New ID", date: Today}, // 기본 값 설정
        ]);
    };

    // 특정 행 삭제 함수
    const deleteRow = (index: number) => {
        setRows(rows.filter((_, rowIndex) => rowIndex !== index));
    };

    // 행 데이터 업데이트 함수
    const updateRow = (index: number, field: keyof Row, value: string | number) => {
        const updatedRows = [...rows];
        updatedRows[index] = { ...updatedRows[index], [field]: value };
        setRows(updatedRows);
    };
    **/

    return (
        <div>
            <table style={{ borderCollapse: "collapse", width: "100%" }}>
                <thead>
                    <tr>
                        <th style={{ border: "1px solid #ccc", padding: "8px", textAlign: "left" }}>
                            번호
                        </th>
                        <th style={{ border: "1px solid #ccc", padding: "8px", textAlign: "left" }}>
                            이름
                        </th>
                        <th style={{ border: "1px solid #ccc", padding: "8px", textAlign: "left" }}>
                            아이디
                        </th>
                        <th style={{ border: "1px solid #ccc", padding: "8px", textAlign: "left" }}>
                            가입일
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <tr key={index}>
                            <td style={{ border: "1px solid #ccc", padding: "8px", textAlign: "center" }}>
                                {index + 1}
                            </td>
                            <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                                {row.name}
                            </td>
                            <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                                {row.id}
                            </td>
                            <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                                {row.date.toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DynamicTable;
