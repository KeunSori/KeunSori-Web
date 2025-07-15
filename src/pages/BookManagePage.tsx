import { css } from "@emotion/css";
import NavBar3 from "../components/navBar/navBar3.tsx";
import { useEffect } from "react";
import BasicManage from "../components/BookMange/BasicManage/BasicManage.tsx";
import DateManage from "../components/BookMange/DateMange/DateManage.tsx";
import Nav from "../components/Nav.tsx";
import {
  ContainerStyle,
  InnerContainerStyle,
} from "../components/Container.tsx";
import { useLocation, useNavigate } from "react-router-dom";

const BookManagePage = () => {
  const locaiton = useLocation();
  const query = new URLSearchParams(locaiton.search);
  const component = query.get("type");
  const navigate = useNavigate();
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate(`/bookmanagement?type=${e.currentTarget.dataset.action}`);
  };
  useEffect(() => {
    if (!component) {
      navigate("/bookmanagement?type=basic");
    }
  }, []);

  return (
    <>
      <NavBar3 />
      <ContainerStyle>
        <div
          className={css`
            width: 60%;
          `}
        >
          <InnerContainerStyle>
            <Nav
              onClick={onClick}
              data-action="basic"
              isActive={component === "basic"}
            >
              기본 예약 관리
            </Nav>

            <Nav
              onClick={onClick}
              data-action="date"
              isActive={component === "date"}
            >
              일자별 예약 관리
            </Nav>
          </InnerContainerStyle>
          {component === "basic" && <BasicManage />}
          {component === "date" && <DateManage />}
        </div>
      </ContainerStyle>
    </>
  );
};
export default BookManagePage;
