import { updateCourseApi } from "@/services/courses.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCourseApi,
    onSuccess: (data) => {
      console.log(data);
      toast.success("Cập nhật khoá học thành công!");
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
};
