import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom"; // Outlet 추가
import { AuthContext } from "../contexts/AuthContext";

interface ProtectedRouteProps {
  allowedStatuses?: ("일반" | "관리자" | "승인 대기" | "알 수 없음")[];
}

const ProtectedRoute = ({ allowedStatuses }: ProtectedRouteProps) => {
  const { user, isLoading, checkAuth } = useContext(AuthContext);
  const [isChecking, setIsChecking] = useState(true);
  const location = useLocation();

  useEffect(() => {
    console.log("[Protected]");
    const verify = async () => {
      console.log("[Verify]");
      if (!user.isLoggedIn) {
        console.log("[LoggedOut]");

        await checkAuth();
      }
      setIsChecking(false);
    };

    verify();
  }, []);

  if (isChecking || isLoading) {
    console.log("[AuthCheck]", isChecking, isLoading);
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
