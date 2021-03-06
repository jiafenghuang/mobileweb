import Axios from 'axios'
import {
  Toast
} from 'vant';
Axios.defaults.baseURL = 'http://127.0.0.1:80/'; // 配置axios请求的地址
Axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
Axios.defaults.crossDomain = true;
Axios.defaults.withCredentials = false; //设置cross跨域 并设置访问权限 允许跨域携带cookie信息
// Axios.defaults.headers.common['Authorization'] = ''; // 设置请求头为 Authorization
//配置发送请求前的拦截器 可以设置token信息 
Axios.interceptors.request.use(config => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    loadingType: 'spinner'
  });
  return config;
}, error => {
  //出错，也要loading结束
  Toast.clear();
  Toast.success('加载失败');

  Mint.Indicator.close();
  return Promise.reject(error);
});
// 配置响应拦截器 
Axios.interceptors.response.use(res => {
  //loading结束
  Toast.clear();

  //这里面写所需要的代码
  if (res.data.code == '401') {
    //全局登陆过滤，当判读token失效或者没有登录时 返回登陆页面
    return false;
  };
  return Promise.resolve(res);
}, error => {
  Toast.clear();
  Toast.success('加载失败');
  return Promise.reject(error);
})

export default Axios;
