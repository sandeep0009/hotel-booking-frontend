import axios from 'axios';



const BASE_URL= import.meta.env.VITE_API_URL ;

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});