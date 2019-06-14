import axios from 'axios'
// import Cookies from 'js-cookie'
// import { Message } from 'element-ui'
// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API_URL ? process.env.VUE_APP_API_URL : '',
  timeout: 15000, // 请求超时时间15s
  headers: { 'Cache-Control': 'no-cache', 'If-Modified-Since': '0' }
})

// request拦截器
service.interceptors.request.use(config =>
  // if (store.getters.token) {
  //   config.headers['X-Token'] = getCookies() // 让每个请求携带自定义token 请根据实际情况自行修改
  // }
  config, (error) => {
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data
    res.now = new Date(response.headers.date).getTime()
   if (res.code !== 'success') {
      return Promise.reject(res)
    }
    return response.data
  },
  (error) => {
    console.log(`err:${error}`) // for debug
    return Promise.reject(error.response.data)
  },
)

export default service
