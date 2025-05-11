import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import GlobalStyle from "./styles/Global/GlobalStyle.tsx";

// pages
import HomePage from "./pages/HomePage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import UserPage from "./pages/UserPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import RecruitPage from "./pages/RecruitPage.tsx";
import BookPage from "./pages/BookPage.tsx";
import BookManagePage from "./pages/BookManagePage.tsx";
import MyPage from "./pages/MyPage.tsx";
import ManagePage from "./pages/ManagePage.tsx";
import PasswordChange from "./pages/PasswordChange.tsx";
import PasswordResetPage from "./pages/PasswordResetPage.tsx";

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
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/member-management" element={<ManagePage />} />
            <Route path="/password-change" element={<PasswordChange />} />
            <Route path="/password-reset" element={<PasswordResetPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
