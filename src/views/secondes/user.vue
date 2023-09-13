<template>
  <div class="user-page">
    <div class="user">
      <img :src="avatar" alt="" />
      <h3>{{ username }}</h3>
    </div>
    <!-- grid宫格，clickable属性控制格子点击反馈；column-num属性定义列数；border属性控制是否显示边框；
         grid-item每一列具体内容；icon属性定义图标名称或图片链接；text属性定义文字内容；to属性定义路由跳转目标-->
    <van-grid clickable :column-num="3" :border="false">
      <van-grid-item icon="clock-o" text="历史记录" to="/" />
      <van-grid-item icon="bookmark-o" text="我的收藏" to="/collect" />
      <van-grid-item icon="thumb-circle-o" text="我的点赞" to="/like" />
    </van-grid>

    <!-- cell单元格，title属性定义左侧标题；is-link控制右侧箭头点击开启反馈 -->
    <van-cell-group class="mt20">
      <van-cell title="推荐分享" is-link />
      <van-cell title="意见反馈" is-link />
      <van-cell title="关于我们" is-link />
      <van-cell @click="logout" title="退出登录" is-link />
    </van-cell-group>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
import { removeToken } from '@/utils/storage'

export default {
  name: 'user-page',
  data () {
    return {
      avatar: '',
      username: ''
    }
  },
  async created () {
    // 页面一创建开始执行，获取用户信息
    const { data } = await getUserInfo()
    // 将相应的数据转接到渲染数据上
    this.avatar = data.avatar
    this.username = data.username
  },
  methods: {
    // 退出登录
    logout () {
      // 清空token
      removeToken()
      // 跳转到login页面
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.user-page {
  padding: 0 10px;
  background: #f5f5f5;
  height: 100vh;
  .mt20 {
    margin-top: 20px;
  }
  .user {
    display: flex;
    padding: 20px 0;
    align-items: center;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      overflow: hidden;
    }
    h3 {
      margin: 0;
      padding-left: 20px;
      font-size: 18px;
    }
  }
}
</style>
