import api from "@/lib/axios";

export const loginApi = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const res = await api.post("/auth/login", { email, password });

  return res.data;
};

export const registerApi = async ({
  firstName,
  lastName,
  email,
  password,
}: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  const res = await api.post("/auth/register", {
    firstName,
    lastName,
    email,
    password,
  });

  return res.data;
};

export const logoutApi = async ({ refreshToken }: { refreshToken: string }) => {
  const res = await api.post("/auth/logout", { refreshToken });

  return res.data;
};
