import { createResourceApi } from "@/services/resources.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useCreateResource = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createResourceApi,
    onSuccess: () => {
      toast.success("Thêm tài liệu thành công");
      queryClient.invalidateQueries({ queryKey: ["resources"] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.log(error.response?.data);
    },
  });
};
