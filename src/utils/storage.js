// 如果是封装名称 变量名要全部大写（符合规范）
const TOKEN_KEY = 'my-token-vant-mobile'

// 获取token
export const getToken = function () {
  return localStorage.getItem(TOKEN_KEY)
}
// 存储token
export const setToken = function (data) {
  localStorage.setItem(TOKEN_KEY, data)
}
// 移出token
export const removeToken = function () {
  localStorage.removeItem(TOKEN_KEY)
}
