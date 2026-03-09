import { createLesson } from "@/services/lessons.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useCreateLesson = () => {
  return useMutation({
    mutationFn: createLesson,
    onSuccess: (data) => {
      console.log(data);
      toast.success("Tạo bài học thành công");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.log(error.response?.data);
    },
  });
};
