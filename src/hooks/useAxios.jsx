import axios from "axios";
import { API_URL } from "../config/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});


const useAxios = () => {
    return axiosInstance;
};

export default useAxios;
