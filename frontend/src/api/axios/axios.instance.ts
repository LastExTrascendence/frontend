import axios from "axios";
import Router from "next/router";
import {
  STATUS_401_UNAUTHORIZED,
  STATUS_403_FORBIDDEN,
} from "@/types/constants/status-code";
import { getCookie, removeCookie } from "@/api/cookie/cookies";

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
  (response) => response,
  (error) => {
    console.log("error", error);
    if (
      error.response?.status === STATUS_401_UNAUTHORIZED ||
      error.response?.status === STATUS_403_FORBIDDEN
    ) {
      removeCookie("access_token", {
        path: "/",
        domain: `${process.env.FE_DOMAIN}`,
      });

      // 클라이언트 사이드 SPA 방식 리디렉션 (CSR)
      // if (typeof window !== "undefined") {
      //   Router.push("/login");
      // }

      // server side 리디렉션
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default instance;
