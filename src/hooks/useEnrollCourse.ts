import { enrollCourseApi } from "@/services/enrollments.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useEnrollCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: enrollCourseApi,
    onSuccess: (_, variables) => {
      toast.success("Đăng ký khoá học thành công!");
      queryClient.invalidateQueries({ queryKey: ["courses", variables.courseId] });
      queryClient.invalidateQueries({ queryKey: ["courses", "enrolled"] });
    },
    onError: () => {
      toast.error("Đăng ký khoá học thất bại. Vui lòng thử lại.");
    },
  });
};
