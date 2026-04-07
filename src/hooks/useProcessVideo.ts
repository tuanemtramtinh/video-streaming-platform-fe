import { processVideo } from "@/services/lessons.service";
import type { IAxiosErrorBody } from "@/types/error.type";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";

export const useProcessVideo = () => {
  return useMutation({
    mutationFn: processVideo,
    onSuccess: () => {
      toast.success("Video đang được xử lý. Vui lòng quay lại sau");
    },
    onError: (error: AxiosError) => {
      const errorBody = error.response?.data as IAxiosErrorBody;
      console.log(errorBody);
      toast.error(
        errorBody ? errorBody.message : "Có vấn đề trong lúc xử lý video",
      );
    },
  });
};
