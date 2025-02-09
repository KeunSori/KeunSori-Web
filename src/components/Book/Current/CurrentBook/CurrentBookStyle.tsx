import styled from "@emotion/styled";
const Divider = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
  width: 2px;
  height: 300px;
  max-height: 100%;
  background-color: #f1f1f1;
`;
const InContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const CalendarContainer = styled.div`
  margin: 20px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const MobileNote = styled.p`
  @media (max-width: 768px) {
    display: block;
    width: 60%;
    text-align: center;
    padding-bottom: 10px;
    border-bottom: 1px solid rgb(187, 187, 187);
  }
  display: none;
`;
const Application = styled.button`
  width: 250px;
  max-width: 100%;
  cursor: pointer;
  min-height: 50px;
  font-weight: 400;
  padding: 10px;
  text-align: center;
  border-radius: 10px;
  background-color: white;
  border: 1px solid #fec511;
  color: #fec511;
  &:hover {
    background-color: #fbe59d;
    color: white;
  }
`;
const NotionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5px;
  padding-right: 10px;
  height: 350px;
  width: 340px;
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
export {
  InContainer,
  CalendarContainer,
  MobileNote,
  Application,
  Divider,
  NotionContainer,
};
