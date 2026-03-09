import { updateLesson } from "@/services/lessons.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useUpdateLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateLesson,
    onSuccess: (data) => {
      console.log(data);
      toast.success("Cập nhật bài học thành công");
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
    },
    // onError: (err) => {
    //   console.log(err.response.data);
    // },
  });
};
