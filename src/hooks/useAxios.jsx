import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://zap-shift-server-nine-ashy.vercel.app",
  timeout: 5000,
});


const useAxios = () => {
    return axiosInstance;
};

export default useAxios;