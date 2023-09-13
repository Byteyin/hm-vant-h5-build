<template>
  <div class="layout-page">
    <!-- 二级路由出口 -->
    <router-view></router-view>

    <!-- v-model绑定标签栏是激活那个标签，route开启路由模式-->
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="notes-o" to="/article"> 面经</van-tabbar-item>
      <van-tabbar-item icon="star-o" to="/collect">收藏</van-tabbar-item>
      <van-tabbar-item icon="like-o" to="/like">喜欢</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layout-page',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style lang="less" scoped></style>
