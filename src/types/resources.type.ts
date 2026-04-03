import type { ICourse } from "@/types/course.type";
import type { ILesson } from "@/types/lesson.type";
import type { IPagination } from "@/types/pagination";

export interface IResource {
  id: number;
  course: ICourse;
  title: string;
  fileUrl: string;
  createdAt: string;
}

export interface IResourceCreateReq extends IResource {
  lessonIds: number[];
}

export interface IResourceResponse {
  data: IResource[];
  meta: IPagination;
}

export interface ILessonByResource {
  lessonId: number;
  resourceId: number;
  lesson: ILesson;
}
