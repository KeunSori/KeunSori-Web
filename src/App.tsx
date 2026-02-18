import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import GlobalStyle from "./styles/Global/GlobalStyle.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import UserPage from "./pages/UserPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import RecruitPage from "./pages/RecruitPage.tsx";
import BookPage from "./pages/BookPage.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import BookManagePage from "./pages/BookManagePage.tsx";
import MyPage from "./pages/MyPage.tsx";
import ManagePage from "./pages/ManagePage.tsx";
import PasswordChange from "./pages/PasswordChange.tsx";
import PasswordResetPage from "./pages/PasswordResetPage.tsx";
import PasswordResetRedirectPage from "./pages/PasswordResetRedirectPage.tsx";

import { Analytics } from "@vercel/analytics/react";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";

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
            <Route path="/password/reset" element={<PasswordResetPage />} />
            <Route
              path="/password/reset/redirect"
              element={<PasswordResetRedirectPage />}
            />
            <Route path="/recruit" element={<RecruitPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* 인증이 필요한 페이지들 */}
            <Route element={<ProtectedRoute />}>
              <Route path="/user" element={<UserPage />} />
              <Route path="/book" element={<BookPage />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/password-change" element={<PasswordChange />} />
            </Route>

            {/* 관리자 페이지 */}
            <Route element={<ProtectedRoute allowedStatuses={["관리자"]} />}>
              <Route
                path="/admin/bookmanagement"
                element={<BookManagePage />}
              />
              <Route path="/admin/member-management" element={<ManagePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Analytics />
      </AuthProvider>
    </>
  );
}

export default App;
