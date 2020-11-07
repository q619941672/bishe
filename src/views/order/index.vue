<template>
  <div class="box">
    <header class="header">
      <van-nav-bar
        title="确认订单"
        left-arrow
        @click-left="back"
      />
    </header>
    <div class="content">
      <div class="addres">
        <van-cell v-if="flag" icon="location-o" is-link center :title="name + ' ' + tel" :label="address" @click="selectAddress"/>
        <van-cell v-else icon="location-o" is-link center title="点击添加地址"  @click="selectAddress"/>
      </div>
      <van-card
        v-for="item of orderlist"
        :key="item.orderid"
        :num="item.num"
        :price="item.price"
        :title="item.proname"
        :thumb="item.proimg"
      />
      <van-submit-bar :price="totalPrice" button-text="去支付" @submit="onSubmit" />
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { NavBar, Card, Cell, SubmitBar, Dialog } from 'vant'
import { getConfirmOrder, deleteCartData } from '@/api'
import { defaultAddress, updateOrderAddress } from '@/api/address'
Vue.use(NavBar)
Vue.use(Card)
Vue.use(SubmitBar)
Vue.use(Cell)
Vue.use(Dialog)
export default {
  data () {
    return {
      orderlist: [],
      name: '吴大勋',
      tel: '18813007814',
      address: '上海市宝山区同济支路199号3号楼千锋教育',
      flag: true,
      list: []
    }
  },
  computed: {
    totalPrice () {
      return this.orderlist ? this.orderlist.reduce((sum, item) => {
        return sum + item.num * item.price
      }, 0) * 100 : 0
    }
  },
  methods: {
    back () {
      Dialog.confirm({
        message: '便宜不等人，请三思而行'
      })
        .then(() => {
          // on confirm
          this.$router.back()
        })
        .catch(() => {
          // on cancel
        })
    },
    onSubmit () {
      if (this.orderlist[0].tel.length === 0) { // 当前采用的不是订单的地址
        // 修改订单地址为默认地址
        updateOrderAddress({
          userid: localStorage.getItem('userid'),
          time: this.$route.params.time,
          name: this.name,
          tel: this.tel,
          address: this.address
        }).then(res => {
          // 支付业务
          console.log('pay')
          this.pay()
          // this.$router.push('/pay/' + this.$route.params.time)
        })
      } else {
        // 支付业务
        console.log('pay')
        this.pay()
        // this.$router.push('/pay/' + this.$route.params.time)
      }
    },
    pay () {
      const list = []
      this.orderlist.forEach(item => {
        list.push(item.proid)
      })
      // 删除购物车中选中的数据，再跳转页面
      deleteCartData({
        userid: localStorage.getItem('userid'),
        list
      }).then(res => {
        this.$router.push('/pay/' + this.$route.params.time)
      })
    },
    formatAddess (province, city, county) {
      let str = ''
      province === city ? str = province + county : str = province + city + county
      return str
    },
    selectAddress () {
      this.$router.push('/orderaddresslist/' + this.$route.params.time)
    }
  },
  mounted () {
    getConfirmOrder({
      userid: localStorage.getItem('userid'),
      time: this.$route.params.time
    }).then(res => {
      this.orderlist = res.data.data
      // 如果订单的列表的第一个元素有地址，就代表所有的都有地址, 以手机号判断
      if (this.orderlist[0].tel.length === 0) { // 没有订单的地址
        // 请求默认的地址
        defaultAddress({
          userid: localStorage.getItem('userid')
        }).then(res => {
          if (res.data.data.length === 0) { // 没有查询到默认地址
            this.flag = false
          } else { // 有默认地址
            this.flag = true
            this.name = res.data.data[0].name
            this.tel = res.data.data[0].tel
            this.address = this.formatAddess(res.data.data[0].province, res.data.data[0].city, res.data.data[0].county) + ' ' + res.data.data[0].addressDetail
          }
        })
      } else { // 有订单的地址
        this.flag = true
        this.name = this.orderlist[0].name
        this.tel = this.orderlist[0].tel
        this.address = this.orderlist[0].address
      }
    })
  }
}
</script>
