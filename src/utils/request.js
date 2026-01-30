import axios from 'axios'
import { Toast } from 'vant'
// 创建axios实例，将来对创建出来的实例进行自定义配置
// 不会污染原始的axios实例
const instance = axios.create({
  baseURL: 'http://smart-shop.itheima.net/index.php?s=/api',
  timeout: 1000
})
// 自定义配置 - 请求/响应 拦截器
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 在这里统一添加 header 参数
  config.headers.platform = 'h5' // 添加 platform 参数
  // 如果需要 token，也可以在这里添加
  const token = localStorage.getItem('token') || sessionStorage.getItem('token')
  if (token) {
    config.headers['Access-Token'] = `Bearer ${token}`
  }
  if (config.url === '/passport/login') {
    config.skipGlobalErrorHandler = true
    Toast.loading({
      message: '登录中...',
      forbidClick: true,
      loadingType: 'spinner',
      duration: 0
    })
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  const res = response.data
  if (res.status !== 200) {
    const config = response.config
    // 检查是否需要跳过全局错误处理
    if (!config?.skipGlobalErrorHandler) {
      Toast(res.message)
      // 抛出一个错误提示
      return Promise.reject(res.message)
    }
  } else {
    Toast.clear()
  }
  return res
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default instance
