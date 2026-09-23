import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000,
});


const useAxios = () => {
    return axiosInstance;
};

export default useAxios;