import styled from "@emotion/styled";

const StoreButton = styled.button`
  background-color: #68ae82;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #5c9f78;
  }
`;
const CancelButton = styled.button`
  background-color: #e86960ff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #c65a52ff;
  }
`;
const Input = styled.input`
  width: 13px;
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
  @media (max-width: 768px) {
    width: 60%;
    padding-bottom: 10px;
    border-bottom: 1px solid rgb(187, 187, 187);
    justify-content: center;
  }
  display: flex;
  align-items: center;
  gap: 10px;
`;

export {
  StoreButton,
  Input,
  CalendarContainer,
  Divider,
  InContainer,
  CancelButton,
};
