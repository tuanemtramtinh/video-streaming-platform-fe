import { getLessonsByResourceIdApi } from "@/services/resources.service";
import { useQuery } from "@tanstack/react-query";

export const useGetLessonsByResourceId = (resourceId: number) => {
  return useQuery({
    queryKey: ["resources", resourceId, "lessons"],
    queryFn: () => getLessonsByResourceIdApi(resourceId),
  });
};
