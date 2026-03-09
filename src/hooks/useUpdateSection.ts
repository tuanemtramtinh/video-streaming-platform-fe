import { updateSection } from "@/services/sections.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useUpdateSection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSection,
    onSuccess: (data) => {
      console.log(data);
      toast.success("Cập nhật chương thành công");
      queryClient.invalidateQueries({ queryKey: ["sections"] });
    },
  });
};
