import api from "@/lib/axios";
import type { ICourse, ICourseResponse } from "@/types/course.type";

export type CreateCoursePayload = {
  title: string;
  description: string;
  thumbnail: File;
  price: string;
  discount: string;
  categoryId: string;
};

export type UpdateCoursePayload = { id: string } & Partial<CreateCoursePayload>;

export const getCourseApi = async ({
  page = 1,
  limit = 9,
}: {
  page: number;
  limit: number;
}) => {
  const res = await api.get("/courses", {
    params: {
      page,
      limit,
    },
  });

  return res.data as ICourseResponse | undefined;
};

export const getCourseByInstructorIdApi = async ({
  instructorId,
  page = 1,
  limit = 9,
}: {
  instructorId: string;
  page: number;
  limit: number;
}) => {
  const res = await api.get(`courses/instructor/${instructorId}`, {
    params: {
      page,
      limit,
    },
  });

  return res.data;
};

export const getCourseDetailApi = async ({ id }: { id: string | number }) => {
  const res = await api.get(`courses/${id}`);

  return res.data as ICourse | undefined;
};

export const createCourseApi = async ({
  title,
  description,
  thumbnail,
  price,
  discount,
  categoryId = "3",
}: CreateCoursePayload) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("thumbnail", thumbnail);
  formData.append("price", price);
  formData.append("discount", discount);
  formData.append("categoryId", categoryId);

  const res = await api.post("/courses", formData);

  return res.data;
};

export const updateCourseApi = async ({
  id,
  title,
  description,
  thumbnail,
  price,
  discount,
  categoryId = "3",
}: UpdateCoursePayload) => {
  const formData = new FormData();

  if (title !== undefined) {
    formData.append("title", title);
  }

  if (description !== undefined) {
    formData.append("description", description);
  }

  if (price !== undefined) {
    formData.append("price", price);
  }

  if (discount !== undefined) {
    formData.append("discount", discount);
  }

  if (categoryId !== undefined) {
    formData.append("categoryId", categoryId);
  }

  // ⚠️ thumbnail xử lý riêng
  if (thumbnail && thumbnail instanceof File) {
    formData.append("thumbnail", thumbnail);
  }

  return api.patch(`/courses/${id}`, formData);
};

export const deleteCourseApi = async ({ id }: { id: string }) => {
  return api.delete(`/courses/${id}`);
};
