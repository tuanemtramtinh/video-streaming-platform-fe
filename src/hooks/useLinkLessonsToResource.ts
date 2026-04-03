import { updateResourceApi } from "@/services/resources.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useLinkLessonsToResource = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      resourceId,
      lessonIds,
      title,
    }: {
      resourceId: number;
      lessonIds?: number[];
      title?: string;
    }) => updateResourceApi(resourceId, { lessonIds, title }),
    onSuccess: (_data, { resourceId }) => {
      toast.success("Cập nhật tài liệu thành công");
      queryClient.invalidateQueries({ queryKey: ["resources"] });
      queryClient.invalidateQueries({
        queryKey: ["resources", resourceId, "lessons"],
      });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.log(error.response?.data);
    },
  });
};
