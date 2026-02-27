import type { IPagination } from "@/types/pagination";

interface IInstructor {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface ICategory {
  id: number;
  name: number;
}

export interface ICourse {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: string;

  categoryId: number;
  instructorId: number;

  category: ICategory;
  instructor: IInstructor;

  price: number;
  discount: number;

  status: "active" | "inactive" | "draft"; // bạn có thể chỉnh lại theo enum backend

  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export interface ICourseResponse {
  data: ICourse[];
  meta: IPagination;
}
