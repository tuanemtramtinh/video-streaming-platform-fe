import { createCourseApi } from "@/services/courses.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useCreateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCourseApi,
    onSuccess: () => {
      // console.log(data);
      toast.success("Tạo khoá học thành công!");
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
};
