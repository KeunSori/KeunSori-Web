import styled from "@emotion/styled";

const UserName = styled.div`
  font-size: 15px;
  font-weight: 700;
`;

const Checkbox = styled.input`
  accent-color: #294031;
  width: 15px;
  height: 15px;
  cursor: pointer;
`;

const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  font-size: 11px;
  font-weight: 300;
  margin-top: 15px;
  color: #7f8fa4;
`;
const Detail = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: rgb(98, 98, 98);
  white-space: nowrap;
  margin-top: 5px;
`;
const Notion = styled.div`
  width: 250px;
  max-width: 100%;
  height: 100%;
  border-radius: 10px;
  border: 1px solid rgb(218, 218, 218);
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.1);
  padding: 20px;
  font-size: 15px;
  font-weight: 700;
`;
export { Notion, Detail, Title, UserName, Checkbox, FlexRow };
