import { registerApi } from "@/services/auth.service";
import type { IAxiosErrorBody } from "@/types/error.type";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerApi,
    onSuccess: () => {
      toast.success("Đăng ký thành công!");
      navigate("/login");
    },
    onError: (error: AxiosError) => {
      const errorBody = error.response?.data as IAxiosErrorBody;
      console.log(errorBody);
      toast.error(
        errorBody ? errorBody.message : "Email hoặc mật khẩu không chính xác",
      );
    },
  });
};
