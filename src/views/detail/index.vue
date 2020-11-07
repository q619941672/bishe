<template>
  <div class="box">
    <header class="header">
      <van-nav-bar title="标题" left-arrow @click-left="$router.back()" @click-right="showShare=true">
        <template #right>
          <van-icon name="ellipsis" size="18"/>
        </template>
      </van-nav-bar>
    </header>
    <div class="content">
      <van-swipe class="my-swipe" @change="onChange">
        <van-swipe-item v-for="(item, index) of bannerlist" :key="index" @click="previewImg">
          <van-image :src="item" ></van-image>
        </van-swipe-item>
        <template #indicator>
          <div class="custom-indicator">
            {{ current + 1 }}/{{ bannerlist.length }}
          </div>
        </template>
      </van-swipe>
      <div class="buy_area">
        <div class="price">
          ¥{{ price }} 销量 {{ sales }} 库存 {{ stock }}
        </div>
        <div class="proname">
          <h3>
            <van-tag type="danger">{{ brand }}</van-tag>
            {{ proname }}
          </h3>
        </div>
      </div>
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" color="#07c160" />
        <van-goods-action-icon icon="cart-o" text="购物车" :badge="totalNum" />
        <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
        <van-goods-action-button type="warning" text="加入购物车" @click="addCart"/>
        <van-goods-action-button type="danger" text="立即购买" />
      </van-goods-action>
    </div>
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, Icon, ShareSheet, Swipe, SwipeItem, Image as VanImage, ImagePreview, Tag, GoodsAction, GoodsActionIcon, GoodsActionButton, Toast } from 'vant'
import { getProDetail, addCart } from '@/api'
import { mapState, mapActions } from 'vuex'
Vue.use(NavBar)
Vue.use(Icon)
Vue.use(ShareSheet)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(VanImage)
Vue.use(ImagePreview)
Vue.use(Tag)
Vue.use(GoodsAction)
Vue.use(GoodsActionIcon)
Vue.use(GoodsActionButton)
Vue.use(Toast)
export default {
  computed: {
    ...mapState({
      loginState: ({ user: { loginState } }) => loginState,
      userid: ({ user: { userid } }) => userid
    }),
    totalNum () {
      return this.$store.getters.totalNum
    }
  },
  data () {
    return {
      showShare: false, // 分享面板的展示标识
      options: [ // 分享面板的 参数
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' }
      ],
      bannerlist: [ // 预先备好轮播图数据
        'https://m.360buyimg.com/mobilecms/s750x750_jfs/t1/50631/35/2890/212150/5d0b5b14E5d8b4b7a/3e1e57b00e6236d1.jpg!q80.dpg.webp',
        'https://m.360buyimg.com/mobilecms/s750x750_jfs/t1/55884/11/7169/155178/5d4b8726Ea1c39717/74629a27825a5c57.jpg!q80.dpg.webp'
      ],
      current: 0, // 表示当前是第几张图片展示
      price: 0,
      proid: '',
      proname: '',
      brand: '',
      stock: 0,
      sales: 0
    }
  },
  methods: {
    ...mapActions({
      getCartList: 'cart/getCartList'
    }),
    addCart () {
      // 本地验证登录
      // if (localStorage.getItem('loginState') === 'true') {
      if (this.loginState) {
        // 后端验证登录状态
        addCart({
          // userid: localStorage.getItem('userid'),
          userid: this.userid,
          proid: this.proid,
          num: 1
        }).then(res => {
          Toast('加入购物车成功')
          this.getCartList(this.userid)
        })
      } else {
        // 前端验证非登录状态 - 直接跳转登录页面
        this.$router.push('/login')
      }
    },
    previewImg () { // 预览图片
      ImagePreview({
        images: this.bannerlist,
        startPosition: this.current
      })
    },
    onChange (index) { // 改变当前是那张图片的展示
      this.current = index // 修改 显示图片的变量
    }
  },
  mounted () {
    const { proid } = this.$route.params
    this.getCartList(this.userid)
    getProDetail({
      proid
    }).then(res => {
      console.log(res.data)
      const proimg = res.data.data[0].proimg
      this.proid = proid
      this.proname = res.data.data[0].proname
      this.price = res.data.data[0].price
      this.brand = res.data.data[0].brand
      this.stock = res.data.data[0].stock
      this.sales = res.data.data[0].sales

      this.bannerlist.unshift(proimg)
    })
  }
}
</script>

<style lang="scss" scoped>
.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 20px;
  background: rgba(0, 0, 0, 0.1);
}
.van-swipe {
  .van-image {
    width: 100%;
  }
}
</style>
