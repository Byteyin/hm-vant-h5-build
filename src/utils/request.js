import axios from 'axios'
import router from '@/router/index'

import { Toast } from 'vant'

import { getToken } from './storage'

// 创建axios的实例对象
const request = axios.create({
  // axios实例请求的基地址
  baseURL: 'http://interview-api-t.itheima.net/',
  // 请求的时间范围，如果超过了就会请求报错
  timeout: 5000
})

// 给实例添加拦截器
// 请求拦截器
request.interceptors.request.use(
  // 对config进行处理，然后发起请求
  function (config) {
    // console.log(config) // config就是请求的信息
    // 请求拦截器统一携带token
    config.headers.Authorization = `Bearer ${getToken()}`
    // 返回请求体
    return config
  },
  function (error) {
    // 请求错误，提示错误信息
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  function (response) {
    console.log(response)
    // 响应成功

    // 响应数据解构，返回响应体数据
    const { data } = response
    // 返回响应体数据
    return data
  },
  function (error) {
    console.log(error)
    // 响应失败

    if (error.response) {
      if (error.response.status === 401) {
        // 如果是token缺失，返回到登录页
        router.push('/login')
      } else {
        // 如果是响应错误，提示响应错误信息
        Toast.fail(error.response.data.message)
      }
    }

    return Promise.reject(error)
  }
)

export default request
