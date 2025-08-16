import styled from "@emotion/styled";

export const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100dvh;
  margin-top: -10vh;
`;

export const Logo = styled.img`
  margin-top: 60px;
  margin-bottom: 30px;
  width: 250px;
  max-width: 90%;
  @media (max-width: 768px) {
    width: 150px;
    margin-top: 40px;
  }
`;

export const LinkText = styled.div`
  font-size: 16px;
  margin-top: 13px;
  color: #808080;
  cursor: pointer;
  &:hover {
    color: black;
  }
`;

export const Notice = styled.div`
  color: rgb(98, 98, 98);
`;