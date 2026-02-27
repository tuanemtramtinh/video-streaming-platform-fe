import router from "@/route";
import { useAuthStore } from "@/stores/useAuthStore";
import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    console.log(originalRequest);

    console.log(error.response?.status);

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = useAuthStore.getState().refreshToken;
        const setAccessToken = useAuthStore.getState().setAccessToken;

        console.log(refreshToken);

        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
          { refreshToken },
        );

        const newAccessToken = res.data.accessToken;

        console.log("New AccessToken: ", newAccessToken);

        setAccessToken(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (err) {
        console.log(err);

        const logout = useAuthStore.getState().logout;

        logout();

        router.navigate("/login");
      }
    }

    return Promise.reject(error);
  },
);

export default api;
