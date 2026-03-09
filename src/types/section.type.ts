import type { IPagination } from "./pagination";

export const SectionStatus = {
  DRAFT: "DRAFT",
  PUBLISHED: "PUBLISHED",
  ARCHIVED: "ARCHIVED",
} as const;

export type SectionStatus = (typeof SectionStatus)[keyof typeof SectionStatus];

export interface ISectionRow {
  id: number;
  orderIndex: number;
  title: string;
  // createdAt: string;
  status: string;
}

export interface ISection {
  id: number;
  courseId: number;
  title: string;
  orderIndex: number;
  status: SectionStatus;
}

export interface ISectionResponse {
  data: ISection[];
  meta: IPagination;
}
