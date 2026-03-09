import api from "@/lib/axios";
import type { ISection, ISectionResponse } from "@/types/section.type";

export const getSectionsByCourseIdApi = async (
  courseId: number,
  page: number,
  limit: number,
) => {
  const res = await api.get(`/sections/course/${courseId}`, {
    params: {
      page,
      limit,
    },
  });

  return res.data as ISectionResponse;
};

export const createSectionApi = async ({
  courseId,
  title,
  orderIndex,
}: {
  courseId: number;
  title: string;
  orderIndex: number;
}) => {
  const res = await api.post(`/sections`, {
    courseId,
    title,
    orderIndex,
  });

  return res.data;
};

export const getSectionById = async (sectionId: string) => {
  const res = await api.get(`/sections/${sectionId}`);
  return res.data as ISection;
};
