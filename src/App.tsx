import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage.tsx";
import GlobalStyle from "./styles/GlobalStyle.tsx";
import LoginPage from "./components/pages/LoginPage.tsx";
import SignUpPage from "./components/pages/SignUpPage.tsx";
import UserPage from "./components/pages/UserPage.tsx";
import ContactPage from "./components/pages/ContactPage.tsx";
import RecruitPage from "./components/pages/RecruitPage.tsx";
import BookPage from "./components/pages/BookPage.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import BookManagePage from "./components/pages/BookManagePage.tsx";
import BoardPage from "./components/pages/BoardPage.tsx";
import MyPage from "./components/pages/MyPage.tsx";
import ManagePage from "./components/pages/ManagePage.tsx";

function App() {
  return (
    <>
      <GlobalStyle />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />

            {/* 인증이 필요한 페이지들 */}

            <Route path="/user" element={<UserPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/recruit" element={<RecruitPage />} />
            <Route path="/book" element={<BookPage />} />
            <Route path="/bookmanagement" element={<BookManagePage />} />
            <Route path="/board" element={<BoardPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/member-management" element={<ManagePage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
