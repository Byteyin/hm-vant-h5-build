import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入路由规则
import routes from './routes'

import { getToken } from '@/utils/storage'

Vue.use(VueRouter)

// 创建一个路由对象
const router = new VueRouter({
  routes
})

// 路由全局前置守卫beforeEach，当页面通过路由跳转的时候会先触发由全局前置守卫，
/* 1. from 你从哪里来， 从哪来的路由信息对象
   2. to   你往哪里去， 到哪去的路由信息对象
   3. next() 是否放行，如果next()调用，就是放行 => 放你去想去的页面
      next(路径) 拦截到某个路径页面 */

// 声明一个白名单，没有限制都可以访问的页面集合
const whiteList = ['/login', '/register']

router.beforeEach((to, from, next) => {
  // console.log('to', to.path)
  // console.log('from', from)
  // 获取用户权限
  const token = getToken()
  // 如果有token那么全部放行
  if (token) {
    next()
  } else {
    // 没有token,首先判断路由跳转的路径是否在白名单中
    if (whiteList.includes(to.path)) {
      // 在白名单中的也无需拦截
      next()
    } else {
      // 不在白名单的需要拦截到登录页，获取权限
      next('/login')
    }
  }
})

// 导出一个路由对象
export default router
