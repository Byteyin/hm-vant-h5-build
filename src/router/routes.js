import Layout from '@/views/layout.vue'
// import Article from '@/views/secondes/article'
// import Like from '@/views/secondes/like'
// import Collect from '@/views/secondes/collect'
// import User from '@/views/secondes/user'

// import Detail from '@/views/detail.vue'
// import Login from '@/views/login.vue'
// import Register from '@/views/register.vue'

const Article = () => import('@/views/secondes/article')
const Like = () => import('@/views/secondes/like')
const Collect = () => import('@/views/secondes/collect')
const User = () => import('@/views/secondes/user')

const Detail = () => import('@/views/detail')
const Login = () => import('@/views/login')
const Register = () => import('@/views/register')

// 定义路由规则
const routes = [
  {
    // 重定向
    path: '/',
    redirect: '/article',
    component: Layout,
    // 子路由
    children: [
      { path: 'article', component: Article },
      { path: 'like', component: Like },
      { path: 'collect', component: Collect },
      { path: 'user', component: User }
    ]
  },
  { path: '/detail/:id', component: Detail },
  { path: '/login', component: Login },
  { path: '/register', component: Register }
]

export default routes
