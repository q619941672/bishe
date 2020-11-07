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
import { Form, Field, Button, NavBar, Toast, Col, Row } from 'vant'
import { login } from '@/api'
import { setStorage } from '@/utils/storage'
import { mapMutations } from 'vuex'
Vue.use(Form)
Vue.use(Field)
Vue.use(Button)
Vue.use(NavBar)
Vue.use(Toast)
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
    ...mapMutations({
      // key值随便定义 value值就是你要提交mutations 时 执行的
      // 生成左侧同名的 自定义的函数，自动提交了右侧的mutation
      changeloginstate: 'user/change_login_state',
      changeuserid: 'user/change_userid',
      changetoken: 'user/change_token'
    }),
    onSubmit (content) {
      console.log(content)
      login(content).then(res => {
        if (res.data.code === '10004') {
          Toast('请先注册账户')
        } else if (res.data.code === '10005') {
          Toast('密码错误')
        } else {
          // 登录成功，保存登录信息
          // localStorage.setItem('token', res.data.data.token)
          // localStorage.setItem('userid', res.data.data.userid)
          // localStorage.setItem('loginState', true)
          // this.$store.commit('user/change_userid', res.data.data.userid)
          // this.$store.commit('user/change_token', res.data.data.token)
          // this.$store.commit('user/change_login_state', true)
          this.changeloginstate(true)
          this.changeuserid(res.data.data.userid)
          this.changetoken(res.data.data.token)
          setStorage('token', res.data.data.token)
          setStorage('userid', res.data.data.userid)
          setStorage('loginState', true)
          this.$router.back() // 返回上一页
        }
      })
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
