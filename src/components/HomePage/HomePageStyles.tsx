import styled from "@emotion/styled";

const TimeLine = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-width: 400px;
  max-width: 80%;
  margin-top: 80px;
  margin-bottom: 150px;
`;

const ActivityContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 150px;
`;
const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 50px;
  margin-bottom: 150px;
`;
const Details = styled.div`
  text-align: center;
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 120px;
  font-family: ImHyeMin, sans-serif;
  color: #505050;
  line-height: 1.5;
`;
const Detail = styled.div`
  text-align: center;
  font-size: 35px;
  margin-top: 30px;
  font-family: ImHyeMin, sans-serif;
  color: #505050;
`;
const HeartImg = styled.img`
  width: 220px;
  margin-top: 100px;
`;

export { TimeLine, ActivityContainer, Cards, Details, Detail, HeartImg };
