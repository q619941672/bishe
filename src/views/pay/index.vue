<template>
  <div class="box">
    <header class="header">
      <van-nav-bar
        title="支付"
        left-arrow
        @click-left="back"
      />
    </header>
    <div class="content">
      <van-image :src="imgurl"></van-image>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { NavBar, Image as VanImage, Dialog } from 'vant'
import { pay, getConfirmOrder } from '@/api'
Vue.use(NavBar)
Vue.use(VanImage)
Vue.use(Dialog)
export default {
  data () {
    return {
      imgurl: '',
      orderlist: []
    }
  },
  methods: {
    back () {
      Dialog.confirm({
        message: '可以去订单中心继续完成本次交易'
      })
        .then(() => {
          // on confirm
          this.$router.go(-2)
        })
        .catch(() => {
          // on cancel
        })
    }
  },
  computed: {
    totalPrice () {
      return this.orderlist ? this.orderlist.reduce((sum, item) => {
        return sum + item.num * item.price
      }, 0) * 100 : 0
    }
  },
  mounted () {
    // 先获取订单的信息，再支付
    getConfirmOrder({
      userid: localStorage.getItem('userid'),
      time: this.$route.params.time
    }).then(res => {
      this.orderlist = res.data.data
      pay({
        body: res.data.data.length + '件商品',
        out_trade_no: this.$route.params.time, // 记住 最多是32位
        total_fee: this.totalPrice
      }).then(res1 => {
        this.imgurl = res1.data.data
      })
    })
  }
}
</script>
