import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const ProtectedRoute = () => {
  const { user, isLoading } = useContext(AuthContext);

  // ✅ 로딩 중이면 아무것도 렌더링하지 않음 (or 로딩 UI 표시 가능)
  if (isLoading) {
    return null; // 👈 로딩 중에는 리디렉트 X
  }

  // ✅ 로그인 상태 확인 후 접근 허용 또는 리디렉트
  return user.isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
