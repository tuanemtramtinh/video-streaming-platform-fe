import { deleteCourseApi } from "@/services/courses.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: deleteCourseApi,
    onSuccess: () => {
      toast.success("Xoá khoá học thành công");
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      navigate("/admin/courses");
    },
  });
};
