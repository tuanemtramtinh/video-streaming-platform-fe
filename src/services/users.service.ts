import api from "@/lib/axios";

export type UpdateProfilePayload = {
  firstName?: string;
  lastName?: string;
};

export const updateMyProfileApi = async (body: UpdateProfilePayload) => {
  const res = await api.patch("/users/me", body);
  return res.data as { firstName: string; lastName: string };
};
