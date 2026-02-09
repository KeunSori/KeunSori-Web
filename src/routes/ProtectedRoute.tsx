import { useContext, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom"; // Outlet 추가
import { AuthContext } from "../contexts/AuthContext";

interface ProtectedRouteProps {
  allowedStatuses?: ("일반" | "관리자" | "승인 대기" | "알 수 없음")[];
}

const ProtectedRoute = ({ allowedStatuses }: ProtectedRouteProps) => {
  const { user, isLoading, checkAuth } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    const verify = async () => {
      await checkAuth();
    };

    verify();
  }, []);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }
  if (!user.isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedStatuses && !allowedStatuses.includes(user.memberStatus)) {
    alert("접근 권한이 없습니다.");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
