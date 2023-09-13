// 引入request模块
import request from '@/utils/request'

// 导出登录请求方法
export const login = function (data) {
  return request.post('/h5/user/login', data)
}

// 导出注册请求方法
export const register = function (data) {
  return request.post('/h5/user/register', data)
}

// 导出获取用户信息方法
export const getUserInfo = function () {
  return request.get('/h5/user/currentUser')
}
