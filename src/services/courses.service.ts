import api from "@/lib/axios";
import type { ICourseDetail, ICourseResponse, IWishlistResponse } from "@/types/course.type";
import type { IEnrollmentResponse } from "@/types/enrollment.type";

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
  keyword,
}: {
  instructorId: string;
  page: number;
  limit: number;
  keyword?: string;
}) => {
  const res = await api.get(`courses/instructor/${instructorId}`, {
    params: {
      page,
      limit,
      ...(keyword ? { keyword } : {}),
    },
  });

  return res.data as ICourseResponse | undefined;
};

export const getCourseDetailApi = async ({ id }: { id: string | number }) => {
  const res = await api.get(`courses/${id}`);

  return res.data as ICourseDetail | undefined;
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

  if (thumbnail && thumbnail instanceof File) {
    formData.append("thumbnail", thumbnail);
  }

  return (await api.patch(`/courses/${id}`, formData)).data;
};

export const deleteCourseApi = async ({ id }: { id: string }) => {
  return await api.delete(`/courses/${id}`);
};

export const getEnrolledCoursesApi = async ({
  page = 1,
  limit = 9,
}: {
  page: number;
  limit: number;
}) => {
  const res = await api.get("/courses/me/enrolled", {
    params: { page, limit },
  });

  return res.data as ICourseResponse | undefined;
};

export const getEnrollmentsByCourseApi = async ({
  courseId,
  page = 1,
  limit = 10,
}: {
  courseId: string | number;
  page: number;
  limit: number;
}) => {
  const res = await api.get(`/courses/${courseId}/enrollments`, {
    params: { page, limit },
  });

  return res.data as IEnrollmentResponse | undefined;
};

export const searchCourse = async (search: string) => {
  return (
    await api.get(`/courses/search`, {
      params: {
        name: search,
      },
    })
  ).data as ICourseResponse;
};

export const getUserWishlistApi = async ({
  page = 1,
  limit = 9,
}: {
  page: number;
  limit: number;
}) => {
  const res = await api.get("/courses/me/wishlist", {
    params: { page, limit },
  });
  return res.data as IWishlistResponse | undefined;
};

export const addToWishlistApi = async ({
  courseId,
}: {
  courseId: number;
}) => {
  const res = await api.post(`/courses/${courseId}/wishlist`);
  return res.data;
};

export const removeFromWishlistApi = async ({
  courseId,
}: {
  courseId: number;
}) => {
  const res = await api.delete(`/courses/${courseId}/wishlist`);
  return res.data;
};
