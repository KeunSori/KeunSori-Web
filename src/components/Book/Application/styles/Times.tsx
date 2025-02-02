import styled from "@emotion/styled";

const SelectedTime = styled.div<{ isMobile: boolean }>`
  display: flex;
  padding-top: 40px;
  flex-direction: ${({ isMobile }) => (isMobile ? "row" : "column")};
  width: 100%
  
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-right: 20px
  font-size: 20px;
  font-weight: 300;
`;
const Times = styled.div<{ isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ isMobile }) => (isMobile ? "10px" : "20px")};
`;
const Time = styled.div`
  white-space: nowrap;
`;
const TimeSlots = styled.div`
  display: flex;
  flex-wrap: nowrap;
  padding: 0px 5px;
  overflow-x: auto;
  scrollbar-width: none;
  @media (max-width: 768px) {
    width: 300px;
  }
  width: 100%;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
  justify-content: center;
`;

export { SelectedTime, Times, Time, TimeSlots };
