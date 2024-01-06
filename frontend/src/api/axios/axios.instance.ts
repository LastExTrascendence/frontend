import axios from "axios";
import { getCookie, removeCookie } from "@/api/cookie/cookies";
import { STATUS_401_UNAUTHORIZED } from "@/types/constants/status-code";

const instance = axios.create({
  baseURL: process.env.BE_SERVER,
  withCredentials: true,
});

instance.interceptors.request.use(async (config: any) => {
  const token = getCookie("access_token") ?? null;
  config.headers = {
    Authorization: `Bearer ${token}`,
  };

  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === STATUS_401_UNAUTHORIZED) {
      removeCookie("access_token", {
        path: "/",
        domain: `${process.env.FE_DOMAIN}`,
      });
      window.location.href = "/login";
      alert(error.response.data.message);
    }
    return Promise.reject(error);
  },
);

export default instance;
