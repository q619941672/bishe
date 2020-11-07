<template>
  <div class="box">
    <header class="header">
      <van-nav-bar
        title="注册"
        left-arrow
        @click-left="$router.back() "
      />
    </header>
    <div class="content">
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="username"
          clearable
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="tel"
          name="tel"
          clearable
          placeholder="手机号"
          :rules="[{ required: true, message: '请填写手机号' }]"
        />
        <van-field
          v-model="code"
          center
          clearable
          name="code"
          placeholder="短信验证码"
          :rules="[{ required: true, message: '请填写短信验证码' }]"
        >
          <template #button>
            <van-button size="small" type="primary" :disabled="telflag" @click="sendCode">{{ msg }}</van-button>
          </template>
        </van-field>
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
            注册
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Form, Field, Button, NavBar, Toast } from 'vant'
import { senCode, register } from '@/api'
Vue.use(Form)
Vue.use(Field)
Vue.use(Button)
Vue.use(NavBar)
Vue.use(Toast)
export default {
  data () {
    return {
      username: '',
      tel: '',
      password: '',
      code: '', // 用户输入的验证码
      adminCode: 'asdada', // 后端传递过来的验证码
      msg: '发送验证码',
      timer: null,
      time: 10
    }
  },
  methods: {
    onSubmit (content) {
      console.log(content)
      // 注意数据类型  content.code - string   admincode-number
      if (content.code * 1 !== this.adminCode) {
        // 验证码不同
        Toast('验证码输入错误')
      } else {
        register(content).then(res => {
          switch (res.data.code) {
            case '10001':
              Toast('该手机号已被注册')
              break
            case '10003':
              Toast('该用户名已被注册')
              break
            case '200':
              Toast('注册成功')
              // 跳转至登录页面
              this.$router.replace('/login')
              break
          }
        })
      }
    },
    sendCode () {
      console.log(this.tel)
      this.timer = setInterval(() => {
        this.time--
        if (this.time === 0) {
          this.msg = '发送验证码'
          clearInterval(this.timer)
          this.time = 10
        } else {
          this.msg = this.time + 's后重新发送'
        }
      }, 1000)
      senCode({
        tel: this.tel
      }).then(res => {
        switch (res.data.code) {
          case '10001':
            Toast('该手机号已被注册')
            break
          case '10002':
            Toast('验证码发送失败，请重新发送')
            break
          case '200':
            Toast('验证码已发送，请查收')
            // 验证码前端校验，将收到的验证码 赋值
            this.adminCode = res.data.telCode
            break
        }
      })
    }
  },
  computed: {
    telflag () {
      if (this.tel.length !== 11 || this.msg !== '发送验证码') {
        return true
      } else {
        return false
      }
    },
    flag () {
      // 可以使用 正则表达式 ，目前采用的字符串的长度代替了 正则表达式
      if (this.username.length >= 2 && this.tel.length === 11 && this.code !== '' && this.password.length > 5) {
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
</style>
