import { getResourcesByLessonIdApi } from "@/services/resources.service";
import { useQuery } from "@tanstack/react-query";

export const useGetResourcesByLessonId = (lessonId: number) => {
  return useQuery({
    queryKey: ["resources", "lesson", lessonId],
    queryFn: () => getResourcesByLessonIdApi(lessonId),
  });
};
