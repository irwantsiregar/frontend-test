import environment from "@/config/environtment";
import { SessionExtended } from "@/types/Auth";
import axios from "axios";
import { getSession } from "next-auth/react";

const headers = {
  "Content-Type": "application/json",
};

const instance = axios.create({
  baseURL: environment.API_URL,
  headers,
  timeout: 60 * 1000,
});

// Intercept request (manipulate) before the continue sending process to server
instance.interceptors.request.use(
  async (request) => {
    const session: SessionExtended | null = await getSession();

    // Check if accessToken exist in session, then set headers-authorization with that accessToken
    if (session && session?.accessToken) {
      request.headers.Authorization = `Bearer ${session.accessToken}`;
    }

    return request;
  },
  (error) => Promise.reject(error),
);

// Intercept response (manipulate) before the continue sending process to client
instance.interceptors.response.use(
  async (response) => response,
  (error) => Promise.reject(error),
);

export default instance;
