import axios from "axios";


const instance = axios.create({
    baseURL: "http://localhost:3100",
    // withCredentials: true,

})

instance.interceptors.request.use(
    config => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers['Authorization'] = "Bearer " + accessToken
        }
        return config;
    },
    error => Promise.reject(error)
)

instance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('refreshToken');
                const response = await axios.post('http://localhost:3100/user/refresh_token', { refreshToken });
                localStorage.setItem('accessToken', response.data.accessToken);
                instance.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
                
                return instance(originalRequest);
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/';
            }
        }
        if(error.response.status === 403){
            window.location.href = '/';
        }

        
        return Promise.reject(error);
    }
);


export default instance;