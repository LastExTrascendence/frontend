import axios from "axios";
import Router from "next/router";
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
    console.log("error", error);
    if (error.response?.status === STATUS_401_UNAUTHORIZED) {
      removeCookie("access_token", {
        path: "/",
        domain: `${process.env.FE_DOMAIN}`,
      });
      // Router.push("/login"); // SPA 방식 리디렉션 (CSR)
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default instance;
