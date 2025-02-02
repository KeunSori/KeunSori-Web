import styled from "@emotion/styled";

const InContainer = styled.div<{ isMobile: boolean }>`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ isMobile }) => (isMobile ? "20px" : "40px")};
  flex-direction: column;
`;
const SlotContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  margin-bottom: 0px;
`;

const Container = styled.div<{ isMobile: boolean }>`
  display: flex;
  justify-content: center;
  flex-direction: ${({ isMobile }) => (isMobile ? "column" : "row")};
  gap: ${({ isMobile }) => (isMobile ? "10px" : "60px")};
`;
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const TypeContainer = styled.div`
  min-width: 70px;
  @media (max-width: 768px) {
  min-width: 45px;
  font-size: 12px;
`;
const MidContainer = styled.div`
  padding-left: 20px;
  @media (max-width: 768px) {
    padding-left: 0;
    justify-content: center;
  }
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export {
  InContainer,
  Container,
  ButtonContainer,
  TypeContainer,
  MidContainer,
  SlotContainer,
};
