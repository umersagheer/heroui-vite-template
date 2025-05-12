import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function AuthLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isAuthenticated, user } = useAuthStore((state) => state);

  // If user is already authenticated, redirect to dashboard
  useEffect(() => {
    if (pathname.startsWith("/auth") && isAuthenticated) {
      navigate("/u/" + user?.id);
    }
  }, [pathname, navigate]);

  useEffect(() => {
    if (pathname === "/auth") {
      navigate("/auth/login");
    }
  }, [pathname, navigate]);

  return (
    <div>
      <Outlet />
    </div>
  );
}
