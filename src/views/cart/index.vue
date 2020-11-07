<template>
  <div class="box">
    <header class="header">
      <van-nav-bar
        title="购物车"
        left-arrow
        @click-left="$router.back()"
      />
    </header>
    <div class="content">
      <van-empty
        v-if="nodata"
        class="custom-image"
        image="https://img.yzcdn.cn/vant/custom-empty-image.png"
        description="购物车空空如也"
      >
        <van-button round type="danger" class="bottom-button">
          请购物
        </van-button>
      </van-empty>
      <van-swipe-cell
        v-else
        v-for="(item, index) of cartlist"
        :key="item.cartid"
      >
        <van-card
          :price="item.price"
          :title="item.proname"
          class="goods-card"
        >
          <template #num>
            <van-stepper v-model="item.num" theme="round" button-size="22" disable-input @change="updateNum(item.cartid, item.num)"/>
          </template>
          <template #thumb>
            <div>
              <van-checkbox v-model="item.flag" @click="selectItem(item)"></van-checkbox>
              <van-image :src="item.proimg"></van-image>
            </div>
          </template>
        </van-card>
        <template #right>
          <van-button square text="删除" type="danger" class="delete-button" @click="delteCart(item.cartid, index)"/>
        </template>
      </van-swipe-cell>
      <van-submit-bar v-if="!nodata" :disabled="totalNum === 0" :price="totalPrice"  :button-text="'提交订单(' + totalNum + ')'" @submit="onSubmit">
        <van-checkbox v-model="checked" @click="selectAll(checked)">全选</van-checkbox>
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, SwipeCell, Card, Button, Empty, SubmitBar, Checkbox, Stepper, Toast, Dialog, Image as VanImage } from 'vant'
import { getCartList, deleteCart, updateNum, updateAllFlag, updateFlag, confirmOrder } from '@/api'
import { mapState } from 'vuex'
Vue.use(NavBar)
Vue.use(SwipeCell)
Vue.use(Card)
Vue.use(Button)
Vue.use(Empty)
Vue.use(SubmitBar)
Vue.use(Checkbox)
Vue.use(Stepper)
Vue.use(Dialog)
Vue.use(VanImage)

export default {
  // beforeRouteEnter (to, from, next) {
  //   if (this.loginState) {
  //     next()
  //   } else {
  //     next('/login')
  //   }
  // },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.loginState) {
        next()
      } else {
        next('/login')
      }
    })
  },
  data () {
    return {
      nodata: false,
      // cartlist: [],
      checked: false
    }
  },
  computed: {
    ...mapState({
      userid: ({ user: { userid } }) => userid,
      loginState: ({ user: { loginState } }) => loginState,
      cartlist: ({ cart: { cartlist } }) => cartlist
    }),
    totalNum () {
      return this.cartlist ? this.cartlist.reduce((sum, item) => {
        // return sum + item.num
        return item.flag ? sum + item.num : sum + 0
      }, 0) : 0
    },
    totalPrice () {
      return this.cartlist ? this.cartlist.reduce((sum, item) => {
        // return sum + item.num * item.price
        return item.flag ? sum + item.num * item.price : sum + 0
      }, 0) * 100 : 0
    }
  },
  async created () {
    // if (localStorage.getItem('loginState') !== 'true') {
    //   this.$router.push('/login')
    // }
    const res = await getCartList({ userid: this.userid })
    if (res.data.code === '10007') {
      this.nodata = true
    } else {
      // this.cartlist = res.data.data
      this.$store.commit('cart/change_cart_list', res.data.data)
      // 计算全选的状态 - every 每一个元素的返回的结果都满足条件，返回为真，否则为假
      this.checked = this.cartlist ? this.cartlist.every(item => {
        return item.flag
      }) : false
    }
  },
  methods: {
    selectItem (item) {
      console.log(item.flag)
      updateFlag({
        cartid: item.cartid,
        flag: item.flag
      }).then(res => {
        Toast('更新成功')
        // 如果当前被选中，计算其余是不是都被选中，如果都被选中，全选为选中
        item.flag ? this.checked = this.cartlist.every(item => item.flag) : this.checked = false
      })
    },
    selectAll (checked) {
      console.log(checked)
      updateAllFlag({
        userid: localStorage.getItem('userid'),
        checked
      }).then(res => {
        Toast('更新成功')
        // 前端渲染
        this.cartlist.map(item => {
          item.flag = checked
        })
      })
    },
    updateNum (cartid, num) {
      console.log(cartid, num)
      updateNum({
        cartid, num
      }).then(res => {
        Toast('更新成功')
      })
    },
    onSubmit () {
      confirmOrder({
        userid: localStorage.getItem('userid')
      }).then(res => {
        this.$router.push('/order/' + res.data.data.time)
      })
    },
    delteCart (cartid, index) {
      Dialog.confirm({
        message: '确定删除吗'
      })
        .then(() => {
          // on confirm
          deleteCart({ cartid }).then(res => {
            Toast('删除成功')
            this.cartlist.splice(index, 1)
            if (this.cartlist.length === 0) {
              this.nodata = true
            }
            this.checked = this.cartlist.every(item => item.flag)
          })
        })
        .catch(() => {
          // on cancel
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.delete-button {
  height: 100%;
}
.van-card__thumb {
  width: 128px;
  div {
    display: flex;
    .van-checkbox {
      width: 32px;
    }
    .van-image {
      flex: 1;
    }
  }
}
</style>
