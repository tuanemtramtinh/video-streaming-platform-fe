import api from "@/lib/axios";

export const enrollCourseApi = async ({ courseId }: { courseId: string }) => {
  const res = await api.post(`/courses/${courseId}/enroll`);
  return res.data;
};
