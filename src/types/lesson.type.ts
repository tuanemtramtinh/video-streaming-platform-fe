import type { IPagination } from "./pagination";

export const LessonType = {
  VIDEO: "video",
  DOCUMENT: "document",
  QUIZ: "quiz",
} as const;

export type LessonType = (typeof LessonType)[keyof typeof LessonType];

export const LessonStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
} as const;

export type LessonStatus = (typeof LessonStatus)[keyof typeof LessonStatus];

export interface ILessonRow {
  id: number;
  orderIndex: number;
  title: string;
  // createdAt: string;
  status: string;
}

export interface ILesson {
  id: number;
  sectionId: number;
  title: string;
  contentUrl: string;
  contentText: string;
  lessonType: LessonType;
  orderIndex: number;
  status: LessonStatus;
}

export interface ILessonResponse {
  data: ILesson[];
  meta: IPagination;
}
