import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigation } from "react-router";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000,
});

const useAxiosSecure = () => {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigation();

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        if (user) {
          const token = await user.getIdToken();

          config.headers.Authorization = `Bearer ${token}`;
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
        // const statusCode = error.status;
        // if (statusCode === 401 || statusCode === 403) {
        //   signOutUser().then(() => {
        //     navigate("/login");
        //   });
        // }

        return Promise.reject(error);
      },
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);

      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user]);

  return axiosSecure;
};

export default useAxiosSecure;
