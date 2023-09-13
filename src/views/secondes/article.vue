<template>
  <div class="article-page">
    <!-- 头部导航 -->
    <!-- nav导航链接，html5新增的语义标签，没有其他效果。
         链接跳转href="javascript",因为a链接必须提供href属性，然而跳转地址为空会刷新页面，造成性能浪费；但#跳转到页面顶端：所以发生动作直接执行javascript代码 -->
    <nav class="my-nav">
      <a
        href="javascript:;"
        @click="changeStatus('weight_desc')"
        :class="{ active: queryObj.sorter === 'weight_desc' }"
        >推荐</a
      >
      <a
        href="javascript:;"
        @click="changeStatus(null)"
        :class="{ active: queryObj.sorter === null }"
        >最新</a
      >
      <div class="logo"><img src="@/assets/logo.png" alt="" /></div>
    </nav>
    <!-- 数据列表 -->
    <!-- list列表组件，通过loading和finished控制列表渲染加载状态，v-model绑定的loadign初始为false为ture开始异步更新;finished属性true控制所有数据加载完毕后停止加载
         finished-text属性是加载完毕后底部提示文字 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <!-- 全局注册的组件 -->
      <ArticleItem v-for="item in list" :key="item.id" :info="item" />
    </van-list>
  </div>
</template>

<script>
import { getArticleList } from '@/api/article'

export default {
  name: 'article-page',
  data () {
    return {
      // 渲染的数据
      list: [],
      // 请求时的参数
      queryObj: {
        current: 1,
        sorter: 'weight_desc'
      },
      loading: false,
      finished: false
    }
  },
  methods: {
    // 页面一加载执行
    async onLoad () {
      // console.log('我是load事件，我被触发了')
      const data = await getArticleList(this.queryObj)
      // console.log(data)
      // 利用解构赋值完成长列表累计数据渲染，也可以在list的后面push
      this.list = [...this.list, ...data.data.rows]

      // 获取数据成功以后将loading修改为false，以便于下次加载获取数据
      this.loading = false

      // 每次请求完之后让当前页自增
      this.queryObj.current++

      if (this.queryObj.current > data.data.pageTotal) {
        // 如果当前页大于总页数时，将finished变量改为true，不再触发load事件
        this.finished = true
      }
    },

    // 切换列表
    changeStatus (type) {
      this.queryObj.sorter = type
      this.queryObj.current = 1 // 还原请求对象中的参数，避免还是之前的旧数据

      // 将数据源还原
      this.list = []

      // 为了避免重复重发load事件
      this.loading = true

      // 重新调用onLoad发起请求获取最新的排序和数据
      this.onLoad()
    }
  }
}
</script>

<style lang="less" scoped>
.article-page {
  margin-bottom: 50px;
  margin-top: 44px;
  .my-nav {
    height: 44px;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 999;
    background: #fff;
    display: flex;
    align-items: center;
    > a {
      color: #999;
      font-size: 14px;
      line-height: 44px;
      margin-left: 20px;
      position: relative;
      transition: all 0.3s;
      &::after {
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
        width: 0;
        height: 2px;
        background: #222;
        transition: all 0.3s;
      }
      &.active {
        color: #222;
        &::after {
          width: 14px;
        }
      }
    }
    .logo {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      > img {
        width: 64px;
        height: 28px;
        display: block;
        margin-right: 10px;
      }
    }
  }
}
</style>
