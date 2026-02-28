import { loginApi } from "@/services/auth.service";
import { useAuthStore } from "@/stores/useAuthStore";
import type { IAxiosErrorBody } from "@/types/error.type";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export const useLogin = () => {
  const naviagate = useNavigate();

  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      setAuth(data.accessToken, data.refreshToken, data.user);
      toast.success("Đăng nhập thành công");
      naviagate("/");
    },
    onError: (error: AxiosError) => {
      const errorBody = error.response?.data as IAxiosErrorBody;
      toast.error(
        errorBody ? errorBody.message : "Email hoặc mật khẩu không chính xác",
      );
    },
  });
};
