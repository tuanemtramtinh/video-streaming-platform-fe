import { searchCourse } from "@/services/courses.service";
import { useQuery } from "@tanstack/react-query";

export const useSearchCourse = (search: string | undefined) => {
  return useQuery({
    queryKey: ["courses", "search", search],
    queryFn: () => searchCourse(search!),
    enabled: !!search,
  });
};
