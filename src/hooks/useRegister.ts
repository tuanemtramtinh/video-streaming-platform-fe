import { registerApi } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useRegister = () => {
  return useMutation({
    mutationFn: registerApi,
    onSuccess: () => {
      toast.success("Đăng ký thành công!");
    },
  });
};
