import styled from "@emotion/styled";
import poster from "/image/poster.svg";
import { Link } from "react-router-dom";

const Apply = () => {
  return (
    <>
      <ApplyContainer>
        <ApplyDetail>
          음악을 사랑한다면, <br />
          당신은 이미 큰소리!{" "}
          <Link to="/recruit">
            <ApplyLink>지원하러 가기 -{`>`}</ApplyLink>
          </Link>
        </ApplyDetail>
        <Poster src={poster} />
      </ApplyContainer>
    </>
  );
};
const ApplyLink = styled.div`
  margin-top: 20px;
  font-family: LeeSeoyun, sans-serif;
  font-size: 20px;
  :hover {
    color: rgb(180, 173, 159);
  }
`;
const ApplyDetail = styled.div`
  font-family: LeeSeoyun, sans-serif;
  font-size: 20px;
  margin-right: 50px;
`;
const ApplyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Poster = styled.img`
  width: 100px;
  height: 200px;
`;
export default Apply;
