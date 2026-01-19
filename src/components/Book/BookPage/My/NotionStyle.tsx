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
  color: #7f8fa4;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const Detail = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: rgb(98, 98, 98);
  white-space: nowrap;
`;
const Notion = styled.div`
  max-width: 100%;
  min-width: 250px;

  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  border-radius: 10px;
  border: 1px solid rgb(218, 218, 218);
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.1);
  padding: 20px;
  font-size: 15px;
  font-weight: 700;
`;
export { Notion, Detail, Title, UserName, Checkbox, FlexRow };
