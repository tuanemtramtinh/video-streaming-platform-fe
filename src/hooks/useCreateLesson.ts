import { createLesson } from "@/services/lessons.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useCreateLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLesson,
    onSuccess: () => {
      toast.success("Tạo bài học thành công");
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.log(error.response?.data);
    },
  });
};
