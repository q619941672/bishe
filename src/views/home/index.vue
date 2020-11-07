<template>
  <div class="box">
    <header class="header">home header</header>
    <div class="content" ref="content">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <Banner :bannerlist = "bannerlist"/>
        <Nav />
        <Ad />
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check="false"
        >
          <Prolist :prolist="prolist"/>
        </van-list>
      </van-pull-refresh>
      <div class="backtop" @click="backtop" v-if="flag">
        <van-icon name="back-top" size="32" color="#cccccc"/>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Swipe, SwipeItem, Grid, GridItem, Image as VanImage, List, PullRefresh, Icon } from 'vant'
import Prolist from './components/Prolist'
import Banner from './components/Banner'
import Nav from './components/Nav'
import Ad from './components/Ad'
// import { getBannerlist, getProlist } from './../../api'
import { getBannerlist, getProlist } from '@/api'
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(VanImage)
Vue.use(List)
Vue.use(PullRefresh)
Vue.use(Icon)
export default {
  data () {
    return {
      bannerlist: [],
      prolist: [],
      loading: false, // 上啦加载时是否正在加载
      finished: false, // 还有没有数据了，true表示没有数据
      count: 2, // 因为一进入页面就请求过第一页的数据了
      isLoading: false, // 下啦刷新是是否正在刷新
      flag: false // 返回顶部的显示和隐藏
    }
  },
  methods: {
    backtop () {
      // document.getElementById('content').scrollTop = 0
      this.$refs.content.scrollTop = 0
    },
    onRefresh () {
      this.isLoading = true // 表示正在下拉刷新
      // 下拉刷新即为第一页的数据的请求
      getProlist().then(res => {
        this.prolist = res.data.data // 替换列表的数据
        // 如果上一次是吧列表拉到了最后一页，没有数据了，此时页码很大
        // 重置页码，并且一定要重置 finished 状态
        this.finished = false // 表示可以继续上拉
        this.count = 2 // 下拉刷新就是第一页的数据，那么下一次上拉就是从第2页开始
        this.isLoading = false // 下拉刷新结束
      })
      console.log('下拉刷新')
    },
    onLoad () {
      this.loading = true // 加载数据中
      getProlist({
        limitNum: 10,
        count: this.count
      }).then(res => {
        if (res.data.data.length === 0) {
          // 没有数据
          this.finished = true
        } else {
          // 拼接数据 之前就是数组，请求出来也是数组 ---- 数组的合并
          // this.prolist = this.prolist.concat(res.data.data)
          this.prolist = [...this.prolist, ...res.data.data]
        }
        this.loading = false // 加载结束
        // 页码加1
        this.count++
      })
      console.log('可以加载数据了')
    },
    scrollFn () {
      // 判断显示和隐藏
      // if (document.getElementById('content').scrollTop > 400) {
      if (this.$refs.content.scrollTop > 400) {
        this.flag = true // 显示
      } else {
        this.flag = false // 隐藏
      }
    }
  },
  created () {
    getBannerlist().then(res => {
      console.log(res)
      this.bannerlist = res.data.data
    })
    getProlist().then(res => {
      console.log(res)
      this.prolist = res.data.data
      // 数据加载完毕，开始监听滚动条的变化
      // document.getElementById('content').addEventListener('scroll', this.scrollFn)
      this.$refs.content.addEventListener('scroll', this.scrollFn)
    })
  },
  components: {
    Prolist,
    Banner,
    Nav,
    Ad
  }
}
</script>

<style lang="scss" scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  text-align: center;
  // background-color: #39a9ed;
}

.m_r_g_title {
  background: -webkit-linear-gradient(left,#FF2A2A,#F139D2);
  background: linear-gradient(90deg, #FF2A2A,#F139D2);
  -webkit-background-clip: text;
  color: transparent;
  font-weight: 700;
  font-size: 18px;
  display: inline-block;
  max-width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.backtop {
  position: fixed;
  bottom: 0.51rem;
  right: 0.1rem;
  width: 0.32rem;
  height: 0.32rem;
  border: 1px solid #ccc;
  border-radius: 50%;
  background-color: #fff;
}
</style>
