import api from "@/lib/axios";
import type {
  ILessonByResource,
  IResource,
  IResourceResponse,
} from "@/types/resources.type";

export const getResourcesByCourseIdApi = async (
  courseId: number,
  page: number,
  limit: number,
) => {
  const res = await api.get(`/resources/courses/${courseId}`, {
    params: { page, limit },
  });
  return res.data as IResourceResponse;
};

export const getLessonsByResourceIdApi = async (resourceId: number) => {
  const res = await api.get(`/resources/${resourceId}/lessons`);
  return res.data as ILessonByResource[];
};

export const updateResourceApi = async (
  resourceId: number,
  body: { lessonIds?: number[]; title?: string },
) => {
  const res = await api.patch(`/resources/${resourceId}`, body);
  return res.data;
};

export const getResourcesByLessonIdApi = async (lessonId: number) => {
  const res = await api.get(`/resources/lessons/${lessonId}`);
  return res.data as IResource[];
};

export const createResourceApi = async (body: {
  courseId: number;
  title: string;
  fileUrl: string;
  fileType: string;
  lessonIds?: number[];
}) => {
  const res = await api.post("/resources", body);
  return res.data as IResource | null;
};
