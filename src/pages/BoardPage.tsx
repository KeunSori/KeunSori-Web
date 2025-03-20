import NavBar2 from "../components/navBar/navBar2";

const BoardPage = () => {
  return (
    <>
      <NavBar2 />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "80px",
        }}
      >
        공사 중
      </div>
    </>
  );
};
export default BoardPage;
