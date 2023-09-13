<template>
  <!-- cell单元格组件，#title插槽定义左侧title内容；#label插槽定义左侧title下方内容；
       元素的v-html直接解析模板渲染
   -->
  <van-cell class="article-item" @click="$router.push('/detail/' + info.id)">
    <template #title>
      <div class="head">
        <img :src="info.avatar" alt="" />
        <div class="con">
          <p class="title van-ellipsis">{{ info.stem }}</p>
          <p class="other">{{ info.creator }} | {{ info.createdAt }}</p>
        </div>
      </div>
    </template>
    <template #label>
      <div class="body van-multi-ellipsis--l2" v-html="info.content"></div>
      <div class="foot">点赞 {{ info.likeCount }} | 浏览 {{ info.views }}</div>
    </template>
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    info: {
      type: Object,
      // 默认值，需要使用工厂函数返回一个空值
      default: () => ({})
    }
  },
  created () {
    console.log(this.info)
  },
  methods: {}
}
</script>

<style scoped lang="less">
.article-item {
  .head {
    display: flex;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
    }
    .con {
      flex: 1;
      overflow: hidden;
      padding-left: 10px;
      p {
        margin: 0;
        line-height: 1.5;
        &.title {
          width: 280px;
        }
        &.other {
          font-size: 10px;
          color: #999;
        }
      }
    }
  }
  .body {
    font-size: 14px;
    color: #666;
    line-height: 1.6;
    margin-top: 10px;
  }
  .foot {
    font-size: 12px;
    color: #999;
    margin-top: 10px;
  }
}
</style>
