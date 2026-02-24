import { logoutApi } from "@/services/auth.service";
import { useAuthStore } from "@/stores/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useLogout = () => {
  const logout = useAuthStore((state) => state.logout);
  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      logout();
      toast.success("Đăng xuất thành công!");
    },
  });
};
