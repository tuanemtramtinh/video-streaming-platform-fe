import type { IPagination } from "@/types/pagination";

export interface ICourse {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: string;

  categoryId: number;
  instructorId: number;

  price: number;
  discount: number;

  status: "active" | "inactive" | "draft"; // bạn có thể chỉnh lại theo enum backend

  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export interface ICourseResponse {
  data: ICourse[];
  pagination: IPagination;
}
