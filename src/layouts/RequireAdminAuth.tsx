import { useAuthStore } from "@/stores/useAuthStore";
import { Navigate, Outlet } from "react-router";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function RequireAdminAuth() {
  const token = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    if (!token) {
      toast.error("Vui lòng đăng nhập");
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
