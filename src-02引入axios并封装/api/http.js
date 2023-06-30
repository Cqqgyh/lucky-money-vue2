import axios from 'axios'
import { Toast } from 'vant'

export const service = axios.create({
  baseURL: '/dev-api',
  timeout: 25000,
})
/**
 * @description: 请求拦截器
 * @returns {*}
 */
service.interceptors.request.use(
  (config) => {
    // 生成不重复的随机用户假Id，存储到localStorage中
    let token = localStorage.getItem('token')
    if (!token) {
      localStorage.setItem('token', Math.random().toString(36).substr(2) +
        Math.random().toString(36).substr(2))
      token = localStorage.getItem('token')
    }
    if (token) {
      config.headers.token = token
    }
    return config
  },
  (error) => {
    Toast.fail(error.message)
    return Promise.reject(error)
  },
)
/**
 * @description: 响应拦截器
 * @returns {*}
 */
service.interceptors.response.use(
  (response) => {
    const { data } = response
    return data
  },
  (error) => {
    Toast.fail('请求失败')
    return Promise.reject(error)
  },
)
/**
 * @description: 导出封装的请求方法
 * @returns {*}
 */
const http = {
  get (
    url,
    params,
    config,
  ) {
    return service.get(url, { params, ...config })
  },

  post (
    url,
    data,
    config,
  ) {
    return service.post(url, data, config)
  },

  put (
    url,
    data,
    config,
  ) {
    return service.put(url, data, config)
  },

  delete (
    url,
    data,
    config,
  ) {
    return service.delete(url, { data, ...config })
  },
}

export default http
