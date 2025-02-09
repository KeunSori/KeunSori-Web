import styled from "@emotion/styled";
import FolderCardDetail from "./FolderCardDetail";
interface FolderCardProps {
  details: FolderDetailInfo;
}
export interface FolderDetailInfo {
  color: string;
  type: string;
  image: string;
  content: string;
  number: number;
}
const FolderCard: React.FC<FolderCardProps> = ({ details }) => {
  return (
    <FolderStyle detailColor={details.color}>
      <FolderCardDetail details={details} />
    </FolderStyle>
  );
};

const FolderStyle = styled.div<{ detailColor: string }>`
  position: relative;
  margin-top: 100px;
  background: ${(prop) => prop.detailColor};
  border-radius: 20px;
  width: 300px;
  height: 300px;
  padding: 20px;
  padding-top: 20px; /* 상단 여백 */
  text-align: center;
  color: #555;
  font-family: "Noto Sans KR", sans-serif;

  &::before {
    content: "";
    position: absolute;
    top: -30px;
    left: 0px;
    width: 150px;
    height: 50px;
    background: ${(prop) => prop.detailColor};
    border-radius: 20px 20px 0 0;
  }
`;

export default FolderCard;
