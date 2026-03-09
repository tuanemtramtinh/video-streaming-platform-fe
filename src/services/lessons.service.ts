import api from "@/lib/axios";
import type { ILesson, ILessonResponse, LessonType } from "@/types/lesson.type";

export const createLesson = async ({
  sectionId,
  title,
  contentUrl = "",
  contentText,
  lessonType,
  orderIndex,
}: {
  sectionId: number;
  title: string;
  contentUrl: string;
  contentText: string;
  lessonType: LessonType;
  orderIndex: number;
}) => {
  const res = await api.post("/lessons", {
    sectionId,
    title,
    contentUrl,
    contentText,
    lessonType,
    orderIndex,
  });

  return res.data as ILesson;
};

export const getLessons = async (
  sectionId: number,
  page: number,
  limit: number,
) => {
  const res = await api.get("/lessons", {
    params: {
      sectionId,
      page,
      limit,
    },
  });
  return res.data as ILessonResponse;
};

export const getLessonDetail = async (lessonId: string) => {
  const res = await api.get(`/lessons/${lessonId}`);

  return res.data as ILesson;
};
