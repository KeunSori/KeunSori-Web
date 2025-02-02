import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import GlobalStyle from "./styles/GlobalStyle.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import UserPage from "./pages/UserPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import RecruitPage from "./pages/RecruitPage.tsx";
import BookPage from "./pages/BookPage.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import BookManagePage from "./pages/BookManagePage.tsx";
import BoardPage from "./pages/BoardPage.tsx";
import MyPage from "./pages/MyPage.tsx";

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
            <Route path="/bookmanage" element={<BookManagePage />} />
            <Route path="/board" element={<BoardPage />} />
            <Route path="/mypage" element={<MyPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
