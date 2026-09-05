import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL:"https://manager.tarundev.xyz/api/"
});