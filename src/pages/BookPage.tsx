// libraries
import { useLocation, useNavigate } from "react-router-dom";
import { css } from "@emotion/css";

// shared
import Nav from "@/styles/Nav.ts";
import NavBar2 from "@/components/navBar/navBar2.tsx";

// this
import CurrentBook from "@/components/Book/BookPage/Current/CurrentBook/CurrentBook.tsx";
import ApplicationBook from "@/components/Book/BookPage/Application/ApplicationBook.tsx";
import MyBook from "@/components/Book/BookPage/My/MyBook.tsx";
import {
  ContainerStyle,
  InnerContainerStyle,
} from "@/components/Book/BookPage/Container.tsx";
import { useEffect } from "react";

const BookPage = () => {
  const locaiton = useLocation();
  const query = new URLSearchParams(locaiton.search);
  const component = query.get("type");
  const navigate = useNavigate();

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate(`/book?type=${e.currentTarget.dataset.action}`);
  };

  useEffect(() => {
    if (!component) {
      navigate("/book?type=current");
    }
  }, [component, navigate]);

  return (
    <>
      <NavBar2 />
      <ContainerStyle>
        <div
          className={css`
            width: 70%;
          `}
        >
          <InnerContainerStyle>
            <Nav
              onClick={onClick}
              data-action="current"
              isActive={component === "current"}
            >
              예약 현황
            </Nav>
            <Nav
              onClick={onClick}
              data-action="application"
              isActive={component === "application"}
            >
              예약 신청
            </Nav>
            <Nav
              onClick={onClick}
              data-action="my"
              isActive={component === "my"}
            >
              나의 예약
            </Nav>
          </InnerContainerStyle>
          {component === "current" && <CurrentBook />}
          {component === "application" && <ApplicationBook />}
          {component === "my" && <MyBook />}
        </div>
      </ContainerStyle>
    </>
  );
};
export default BookPage;
