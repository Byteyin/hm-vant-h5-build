<template>
  <div class="register-page">
    <van-nav-bar title="面经注册" />

    <!-- 注册表单 -->
    <!-- 表单Form,此案例运用了输入框Field、按钮button
         Form表单区域，submit事件提交表单验证通过后触发,回调参数是通过定义的标志符；rules属性定义Rule数据结构，required是否是必填项，message校验失败提示信息，pattern通过正则表达式进行校验。
         Field输入框，v-model双向绑定值;name属性提交表单的标志符;label属性定义左侧内容;placeholder属性定义占位符内容。
         button按钮，blocks属性定义为块级元素;type属性区分按钮类型，展示不同按钮效果；native-type属性原生button的type属性
          -->
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[
          {
            required: true,
            message: '用户名不能为空'
          },
          {
            message: '用户名至少包含5个字符',
            pattern: /^\w{5,}$/
          }
        ]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[
          {
            required: true,
            message: '密码不能为空'
          },
          {
            message: '密码至少包含6个字符',
            pattern: /^\w{6,}$/
          }
        ]"
      />
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">注册</van-button>
      </div>
    </van-form>
    <!-- 声明式导航，跳转到登录页面 -->
    <router-link class="link" to="/login">有账号？去登录！</router-link>
  </div>
</template>

<script>
import { register } from '@/api/user'

export default {
  name: 'register-page',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async onSubmit (values) {
      console.log(values)
      const data = await register(values)
      console.log(data)

      this.$toast.success(data.data.username + '注册成功')

      // 利用全局路由对象跳转到登录页面
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.link {
  color: #069;
  font-size: 12px;
  padding-right: 20px;
  float: right;
}
</style>
