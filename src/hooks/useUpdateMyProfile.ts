import { updateMyProfileApi } from "@/services/users.service";
import { useAuthStore } from "@/stores/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useUpdateMyProfile = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const accessToken = useAuthStore((state) => state.accessToken);
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const user = useAuthStore((state) => state.user);

  return useMutation({
    mutationFn: updateMyProfileApi,
    onSuccess: (data) => {
      toast.success("Cập nhật hồ sơ thành công!");
      if (user && accessToken && refreshToken) {
        setAuth(accessToken, refreshToken, { ...user, ...data });
      }
    },
    onError: () => {
      toast.error("Cập nhật hồ sơ thất bại. Vui lòng thử lại.");
    },
  });
};
