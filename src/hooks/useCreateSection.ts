import { createSectionApi } from "@/services/sections.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useCreateSection = (courseId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSectionApi,
    onSuccess: (data) => {
      console.log(data);
      toast.success("Tạo khoá học thành công!");
      queryClient.invalidateQueries({ queryKey: ["sections", courseId] });
    },
  });
};
