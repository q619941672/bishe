<template>
  <div class="box">
    <header class="header">
      <van-nav-bar
        title="登录"
        left-arrow
        @click-left="$router.back() "
      />
    </header>
    <div class="content">
      <van-form @submit="onSubmit">
        <van-field
          v-model="loginname"
          name="loginname"
          clearable
          placeholder="用户名/手机号"
          :rules="[{ required: true, message: '请填写用户名/手机号' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          clearable
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
          <van-button :disabled="!flag" round block type="info" native-type="submit">
            登录
          </van-button>
          <van-row>
            <van-col span="12">忘记密码</van-col>
            <van-col span="12" class="text">
              <router-link to="/register">快速注册</router-link>
            </van-col>
          </van-row>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Form, Field, Button, NavBar, Col, Row } from 'vant'
Vue.use(Form)
Vue.use(Field)
Vue.use(Button)
Vue.use(NavBar)
Vue.use(Col)
Vue.use(Row)
export default {
  data () {
    return {
      loginname: '',
      password: ''
    }
  },
  methods: {
    async onSubmit (content) {
      console.log(content)
      // this.$store.dispatch('user/login', content).then(() => {
      //   this.$router.back()
      // })
      await this.$store.dispatch('user/login', content)
      this.$router.back()
    }
  },
  computed: {
    flag () {
      // 可以使用 正则表达式 ，目前采用的字符串的长度代替了 正则表达式
      if (this.loginname.length >= 2 && this.password.length > 5) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  padding-top: 100px;
  background-color: #fff;
}
.text {
  text-align: right;
}
.van-row {
  margin-top: 30px;
}
</style>
