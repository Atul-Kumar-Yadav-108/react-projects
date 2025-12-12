import axios from 'axios';
import useAuthStore  from '../store/authStore'

const axiosClient = axios.create({
    baseURL :  "http://localhost:5000/api",
    withCredentials: true
});

// add token automatically 
axiosClient.interceptors.request.use((config)=>{
    const token = useAuthStore.getState().token;
    if(token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

// handle token expires 
axiosClient.interceptors.request.use(
    (res) => res,
    (err) =>{
        if(err.response?.status === 401){
            useAuthStore.getState().logout();
        }
        return Promise.reject(err)
    }
)

export default axiosClient