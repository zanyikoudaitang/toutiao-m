import axios from "axios";
import store from '@/store'

const request = axios.create({
    baseURL:" http://toutiao.itheima.net"
})

request.interceptors.request.use(
    function (config) {
        // config表示axios中的配置对象
        if (store?.state?.user?.token) {
            config.headers['Authorization']= 'Bearer ' + store.state.user.token
        }       
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});







export default request