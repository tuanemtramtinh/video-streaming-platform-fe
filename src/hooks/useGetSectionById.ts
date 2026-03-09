import { getSectionById } from "@/services/sections.service";
import { useQuery } from "@tanstack/react-query";

export const useGetSectionById = (sectionId: string) => {
  return useQuery({
    queryKey: ["sections", sectionId],
    queryFn: () => getSectionById(sectionId),
  });
};
