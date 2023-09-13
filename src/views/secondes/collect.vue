<template>
  <div class="collect-page">
    <!-- list列表组件，finished-text属性定义加载完毕后提示内容；v-model绑定值初始为false当为true时控制异步更新；finished属性控制数据全部加载完毕后不再更新。 -->
    <van-list
      finished-text="没有更多了"
      v-model="loading"
      :finished="finished"
      @load="onLoad"
    >
      <!-- 全局组件 -->
      <ArticleItem v-for="item in list" :key="item.id" :info="item" />
    </van-list>
  </div>
</template>

<script>
import { getArticleCollect } from '@/api/article'

export default {
  name: 'collect-page',
  data () {
    return {
      // 渲染的数据
      list: [],
      // 请求时的参数
      page: 1,
      loading: false,
      finished: false
    }
  },
  methods: {
    // 页面一加载执行
    async onLoad () {
      // console.log('我是load事件，我被触发了')
      const data = await getArticleCollect(this.page)
      // console.log(data)
      // 利用解构赋值完成长列表累计数据渲染，可以直接在渲染列表后面push
      this.list = [...this.list, ...data.data.rows]

      // 获取数据成功以后将loading修改为false，以便于下次加载获取数据
      this.loading = false

      // 每次请求完之后让当前页自增
      this.page++

      if (this.page > data.data.pageTotal || !data.data.rows.length) {
        // 如果当前页大于总页数时，将finished变量改为true，不再触发load事件
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.collect-page {
  margin-bottom: 50px;
  margin-top: 44px;
}
</style>
