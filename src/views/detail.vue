<template>
  <div class="detail-page">
    <!-- Navbar导航组件，title属性定义标题内容；left-text属性定义左侧文案；left-arrow属性是否左侧显示箭头；fixed属性是否固定到顶部；click-left事件是点击左侧按钮触发,利用router对象跳转并向上一级历史页面。 -->
    <van-nav-bar
      title="面经详细"
      left-text="返回"
      left-arrow
      fixed
      @click-left="$router.go(-1)"
    />
    <header class="header">
      <h1>{{ article.stem }}</h1>
      <p>
        {{ article.createdAt }} | {{ article.views }} 浏览量 |
        {{ article.likeCount }} 点赞数
      </p>
      <p>
        <img :src="article.avatar" alt="" />
        <span>{{ article.creator }}</span>
      </p>
    </header>
    <main class="body" v-html="article.content"></main>
    <div class="opt">
      <!-- icon图标组件，name属性是图片名称或图片链接； -->
      <van-icon
        :class="{ active: article.likeFlag }"
        name="like-o"
        @click="toggleLike"
      />
      <van-icon
        :class="{ active: article.collectFlag }"
        name="star-o"
        @click="toggleCollect"
      />
    </div>
  </div>
</template>

<script>
import { getArticleDetail, updateLike, updateCollect } from '@/api/article'

export default {
  name: 'detail-page',
  data () {
    return {
      // 渲染对象
      article: {}
    }
  },
  async created () {
    // 一创建就获取渲染数据
    const id = this.$route.params.id // 承接传过来的id号
    // 获取面经详情
    const { data } = await getArticleDetail(id)
    // console.log(data)
    this.article = data // 将响应的数据转接给渲然对象
  },
  methods: {
    // 点赞与否
    async toggleLike () {
      // 发请求实现确认或取消点赞
      await updateLike(this.article.id)

      // 每一次点击都会切换是否点赞
      this.article.likeFlag = !this.article.likeFlag

      // 区分是否点赞
      if (this.article.likeFlag) {
        this.article.likeCount++
        this.$toast.success('点赞成功')
      } else {
        this.article.likeCount--
        this.$toast.fail('取消点赞')
      }
    },
    // 收藏与否
    async toggleCollect () {
      // 发请确认或取消收藏
      await updateCollect(this.article.id)

      // 每一次点击都会切换是否收藏
      this.article.collectFlag = !this.article.collectFlag

      // 区分是否收藏
      if (this.article.collectFlag) {
        this.$toast.success('收藏成功')
      } else {
        this.$toast.fail('取消收藏')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.detail-page {
  margin-top: 44px;
  overflow: hidden;
  padding: 0 15px;
  .header {
    h1 {
      font-size: 24px;
    }
    p {
      color: #999;
      font-size: 12px;
      display: flex;
      align-items: center;
    }
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
    }
  }
  .opt {
    position: fixed;
    bottom: 100px;
    right: 0;
    > .van-icon {
      margin-right: 20px;
      background: #fff;
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-radius: 50%;
      box-shadow: 2px 2px 10px #ccc;
      font-size: 18px;
      &.active {
        background: #fec635;
        color: #fff;
      }
    }
  }
}
</style>
