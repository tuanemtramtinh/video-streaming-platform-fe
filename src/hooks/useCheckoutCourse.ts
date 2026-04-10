import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { checkoutCourseApi } from "@/services/payments.service";

export const useCheckoutCourse = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: checkoutCourseApi,
    onSuccess: (data) => {
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        toast.success("Đăng ký khoá học thành công!");
        queryClient.invalidateQueries({ queryKey: ["courses", String(data.courseId)] });
        queryClient.invalidateQueries({ queryKey: ["courses", "enrolled"] });
        navigate(`/courses/${data.courseId}`);
      }
    },
    onError: () => {
      toast.error("Không thể tạo thanh toán. Vui lòng thử lại.");
    },
  });
};
