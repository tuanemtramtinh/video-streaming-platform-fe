import api from "@/lib/axios";
import type {
  ISection,
  ISectionResponse,
  SectionStatus,
} from "@/types/section.type";

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

export const updateSection = async ({
  sectionId,
  title,
  orderIndex,
  status,
}: {
  sectionId: string;
  title?: string | undefined;
  orderIndex?: number | undefined;
  status?: SectionStatus | undefined;
}) => {
  const res = await api.patch(`/sections/${sectionId}`, {
    title,
    orderIndex,
    status,
  });

  return res.data as ISection;
};

export const deleteSectionApi = async ({
  sectionId,
}: {
  sectionId: string;
}) => {
  const res = await api.delete(`/sections/${sectionId}`);
  return res.data;
};
