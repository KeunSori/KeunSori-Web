import axios from "axios"

const API_URL = "http://ec2-13-209-174-180.ap-northeast-2.compute.amazonaws.com";

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 5000,
})

axiosInstance.interceptors.request.use(
    (config)=>{
        const accessToken: string | null = localStorage.getItem('accessToken');
        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default axiosInstance;