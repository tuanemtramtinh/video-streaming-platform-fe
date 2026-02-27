import type { RoleTypeType } from "@/types/role.type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: RoleTypeType[];
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;

  setAuth: (accessToken: string, refreshToken: string, user: User) => void;

  setAccessToken: (accessToken: string) => void;

  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,

      setAuth: (accessToken: string, refreshToken: string, user: User) => {
        set({ accessToken, refreshToken, user });
      },

      setAccessToken: (accessToken: string) => {
        set({
          accessToken: accessToken,
        });
      },

      logout: () => {
        set({ accessToken: null, refreshToken: null, user: null });
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);
