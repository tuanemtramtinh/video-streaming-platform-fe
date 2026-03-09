import { getCourseDetailWithSectionsAndLessons } from "@/services/courses.service";
import { useQuery } from "@tanstack/react-query";

export const useGetCourseDetailWithSectionsAndLessons = (courseId: string) => {
  return useQuery({
    queryKey: ["courses", courseId],
    queryFn: () => getCourseDetailWithSectionsAndLessons(courseId),
  });
};
