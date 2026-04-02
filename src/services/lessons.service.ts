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

export const updateLesson = async ({
  lessonId,
  title,
  orderIndex,
  lessonType,
  contentText,
  contentUrl,
}: {
  lessonId: string;
  title?: string;
  orderIndex?: number;
  lessonType?: LessonType;
  contentText?: string;
  contentUrl?: string;
}) => {
  const body = {
    title,
    orderIndex,
    lessonType,
    contentText,
    contentUrl,
  };
  console.log("I was here");
  const filteredBody = Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(body).filter(([_, v]) => v !== undefined),
  );

  console.log(filteredBody);

  const res = await api.patch(`/lessons/${lessonId}`, filteredBody);

  return res.data;
};

export const deleteLesson = async ({ id }: { id: string }) => {
  return api.delete(`/lessons/${id}`);
};

export const processVideo = async ({
  lessonId,
}: {
  lessonId: number | string;
}) => {
  const res = await api.post(`/lessons/${lessonId}/process-video`);

  return res.data;
};
