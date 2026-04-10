import type { IPagination } from "@/types/pagination";

export interface IEnrollment {
  userId: number;
  courseId: number;
  enrolledAt: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export interface IEnrollmentResponse {
  data: IEnrollment[];
  meta: IPagination & { total: number };
}
