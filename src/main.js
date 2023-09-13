import Vue from 'vue'
import App from './App.vue'
// 路由
import router from './router'
// 组件
import ArticleItem from '@/components/ArticleItem.vue'
// vant组件库
import '@/utils/vant'

Vue.config.productionTip = false
// 注册全局组件
Vue.component('ArticleItem', ArticleItem)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
