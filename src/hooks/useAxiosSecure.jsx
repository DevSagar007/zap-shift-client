import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";
import { API_URL } from "../config/api";

const axiosSecure = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  withCredentials: true,
});

const readCookie = (name) =>
  document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${name}=`))
    ?.split("=")[1];

const useAxiosSecure = () => {
  const { signOutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        if (!["get", "head", "options"].includes(config.method?.toLowerCase())) {
          const csrfToken = readCookie("zap_shift_csrf");
          if (csrfToken) {
            config.headers = config.headers || {};
            config.headers["X-CSRF-Token"] = csrfToken;
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error(
          "Axios response error:",
          error.response?.data || error.message,
        );
        const statusCode = error.response?.status;
        if (statusCode === 401 || statusCode === 403) {
          signOutUser().then(() => {
            navigate("/login");
          });
        }

        return Promise.reject(error);
      },
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);

      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [signOutUser, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
