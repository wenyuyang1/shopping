import axios from 'axios'
import { GET_TOKEN  }  from '@/utils/storage'
import { Toast } from 'vant'
// 创建一个axios实例
const instance = axios.create({
    // 设置基础URL
    baseURL: 'http://cba.itlike.com/public/index.php?s=/api/',
    
    // 设置超时时间
    timeout: 5000
})
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // config.headers.platform = `H5`;    黑马后端已优化默认值，不用在请求头里再加一个platform
    const token = GET_TOKEN().token
    if (token) {
        config.headers['Access-Token'] = token
    } 
    // 添加全局的loading显示，防页面加载时用户点击其它按钮指令
    Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0,
    })
    // 对请求配置做点什么
    return config
}, function (err) {
    // 对请求错误做点什么
    return Promise.reject(err)
})
// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 去除loading显示，让页面在更新响应后恢复
    Toast.clear()
    // 对响应数据做点什么
    const res = response.data
  if (res.status !== 200) {
    Toast(res.message)
    return Promise.reject(res.message)
  }
    return res
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
})
axios.defaults.headers
export default instance