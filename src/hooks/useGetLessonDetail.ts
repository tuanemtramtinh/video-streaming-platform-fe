import { getLessonDetail } from "@/services/lessons.service";
import { useQuery } from "@tanstack/react-query";

export const useGetLessonDetail = (lessonId: string | undefined) => {
  return useQuery({
    queryKey: ["lessons", lessonId],
    queryFn: () => getLessonDetail(lessonId!),
    enabled: !!lessonId,
  });
};
