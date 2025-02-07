import styled from "@emotion/styled";

const NotionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5px;
  padding-right: 10px;
  height: 350px;
  max-height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  wrap: no-wrap;
  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
  }
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #bbb;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: #888;
  }
`;
export default NotionContainer;
