import type { IPagination } from "@/types/pagination";
import type { ISection } from "./section.type";

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

  isEnrolled: boolean;

  price: number;
  discount: number;

  status: "active" | "inactive" | "draft"; // bạn có thể chỉnh lại theo enum backend

  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export interface ICourseDetail extends ICourse {
  sections: ISection[];
}

export interface ICourseResponse {
  data: ICourse[];
  meta: IPagination;
}

export interface IWishlistItem {
  userId: number;
  courseId: number;
  createdAt: string;
  course: ICourse;
}

export interface IWishlistResponse {
  data: IWishlistItem[];
  meta: IPagination;
}
