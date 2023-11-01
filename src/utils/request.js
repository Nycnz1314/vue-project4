import axios from 'axios';
import {showToast} from "vant";
// 创建一个自定义的Axios对象
const Axios = axios.create({
    baseURL: 'http://localhost:8088/toutiao1/',
    timeout: 3000,
    headers: { 
        'Content-Type': 'application/x-www-form-urlencoded'
    }   
});

Axios.interceptors.request.use(req => {
    // 请求拦截处理
    return req; 
}, err => {
    console.log('在发送请求时发生错误，错误为', err);
    //这里不能直接放回err,需要按照官方说明返回一个Promise
    return Promise.reject(err);
})

Axios.interceptors.response.use(res => {
    if(res.data.code==0){
       return res.data
    }
    if(res.data.code==undefined){
        return res.data;
    }
    // 响应拦截处理
    return res.data.data;
}, error => {
    const err = error.toString();
    //按照实际的响应包进行解析，通过关键字匹配的方式
    switch (true) {
        case err.indexOf('Network') !== -1:
            console.log('后端服务器无响应或者URL错误', err);
            break;
        case err.indexOf('timeout') !== -1:
            console.log('请求后端服务器超时！', err);
            break;
    }
    return Promise.reject(error);
})

//暴露Axios实例化对象，允许所有文件调用Axios
export default Axios;
