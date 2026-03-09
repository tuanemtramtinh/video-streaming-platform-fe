import { deleteLesson } from "@/services/lessons.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

export const useDeleteLesson = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id, sectionId } = useParams();

  return useMutation({
    mutationFn: deleteLesson,
    onSuccess: () => {
      toast.success("Xoá bài học thành công");
      queryClient.invalidateQueries({ queryKey: ["lessons"] });

      if (id && sectionId) {
        navigate(`/admin/courses/${id}/sections/${sectionId}/lessons`);
      }
    },
  });
};
