import { getLessons } from "@/services/lessons.service";
import { useQuery } from "@tanstack/react-query";

export const useGetLessons = (
  sectionId: number,
  page: number,
  limit: number,
) => {
  return useQuery({
    queryKey: ["lessons", sectionId, page, limit],
    queryFn: () => getLessons(sectionId, page, limit),
  });
};
