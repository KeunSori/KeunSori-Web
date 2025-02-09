import styled from "@emotion/styled";

const Title = styled.div`
  font-size: 11px;
  font-weight: 300;
  margin-top: 15px;
  color: #7f8fa4;
`;
const Detail = styled.div`
  font-size: 14px;
  font-weight: 300;
  margin-top: 5px;
`;

const NotionItem = styled.div`
  @media (max-width: 768px) {
    width: 280px;
  }
  padding: 20px 30px;
  width: 320px;
  max-width: 100%;
  height:100%
  min-height: 150px;
  border-radius: 10px;
  border: 1px solid rgb(218, 218, 218);
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.1);
  padding: 15px px;
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 20px;
`;

export { NotionItem, Title, Detail };
