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
import { mapActions, mapGetters } from 'vuex'
import storeMixin from '@/mixins/storeMixin'
export default {
  mixins: [storeMixin],
  computed: {
    // ...mapState({
    //   loginState: ({ user: { loginState } }) => loginState, // 多层解构 的 解构赋值
    //   userid: ({ user: { userid } }) => userid // 多层解构 的 解构赋值
    // }),
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
}
</script>
