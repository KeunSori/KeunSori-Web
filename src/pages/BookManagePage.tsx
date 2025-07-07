// external
import { css } from "@emotion/css";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// internal
import NavBar3 from "@/components/navBar/navBar3.tsx";
import BasicManage from "@/components/Book/BookManage/BasicManage/BasicManage.tsx";
import DateManage from "@/components/Book/BookManage/DateManage/DateManage.tsx";
import Nav from "@/styles/Nav.ts";
import {
  ContainerStyle,
  InnerContainerStyle,
} from "@/components/Book/BookPage/Container.tsx";

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
