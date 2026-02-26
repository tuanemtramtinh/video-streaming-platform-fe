import api from "@/lib/axios";
import type { ICourse, ICourseResponse } from "@/types/course.type";

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
}: {
  title: string;
  description: string;
  thumbnail: File;
  price: string;
  discount: string;
  categoryId: string;
}) => {
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
