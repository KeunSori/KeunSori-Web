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
            <Route path="/user" element={<UserPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/recruit" element={<RecruitPage />} />
            <Route path="/book" element={<BookPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
