import { getLessons } from "@/services/lessons.service";
import { useQuery } from "@tanstack/react-query";

export const useGetLessons = (
  sectionId: number,
  page: number,
  limit: number,
  keyword?: string,
) => {
  return useQuery({
    queryKey: ["lessons", sectionId, page, limit, keyword],
    queryFn: () => getLessons(sectionId, page, limit, keyword),
  });
};
