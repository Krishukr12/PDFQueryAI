import axios from "axios";

import { useAuth } from "@clerk/clerk-react";
import { useMemo } from "react";

export const useAxiosWithAuth = () => {
  const { getToken } = useAuth();

  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL: "http://localhost:8080",
      timeout: 80000,
    });

    instance.interceptors.request.use(
      async (config) => {
        const token = await getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return instance;
  }, [getToken]);

  return axiosInstance;
};
