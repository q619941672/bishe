<template>
  <footer class="footer">
    <ul>
      <router-link to="/home" tag="li">
        <span class="iconfont icon-shouye"></span>
        <p>首页</p>
      </router-link>
      <router-link to="/kind" tag="li">
        <span class="iconfont icon-2"></span>
        <p>分类</p>
      </router-link>
      <router-link to="/cart" tag="li">
        <span class="iconfont icon-icon-"></span>
        <p>购物车{{totalNum}}</p>
      </router-link>
      <router-link to="/user" tag="li" v-if="loginState">
        <span class="iconfont icon-daohanglan-05"></span>
        <p>我的</p>
      </router-link>
      <router-link to="/login" tag="li" v-else>
        <span class="iconfont icon-daohanglan-05"></span>
        <p>未登录</p>
      </router-link>
    </ul>
  </footer>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapState({
      // loginState: (state) => state.user.loginState // 箭头函数默认自带返回值
      // loginState: ({ user }) => user.loginState // 参数的解构赋值
      loginState: ({ user: { loginState } }) => loginState, // 多层解构 的 解构赋值
      userid: ({ user: { userid } }) => userid // 多层解构 的 解构赋值
    }),
    // totalNum () {
    //   return this.$store.getters.totalNum
    // }
    ...mapGetters({
      totalNum: 'totalNum'
    })
  },
  methods: {
    ...mapActions({
      getCartList: 'cart/getCartList'
    })
  },
  created () {
    this.getCartList(this.userid)
  }
  // computed: { // 辅助函数获取用户的登录状态
  //   ...mapState({ // ... 为了合并对象
  //     loginState: (state) => { // loginSate 当前组件访问的依据，state全部的状态，访问时使用模块化访问思想
  //       return state.user.loginState
  //     }
  //   })
  // }
  // computed: { // 原始的获取状态的方式
  //   loginState () {
  //     if (this.$store.state.user.loginState) {
  //       return true
  //     } else {
  //       return false
  //     }
  //   }
  // }
}
</script>
