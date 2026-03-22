import { deleteSectionApi } from "@/services/sections.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

export const useDeleteSection = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id, sectionId } = useParams();

  return useMutation({
    mutationFn: deleteSectionApi,
    onSuccess: () => {
      toast.success("Xoá chương thành công");
      queryClient.invalidateQueries({ queryKey: ["sections"] });
      if (sectionId) {
        queryClient.removeQueries({ queryKey: ["sections", sectionId] });
      }
      if (id) {
        navigate(`/admin/courses/${id}/sections`);
      }
    },
  });
};
