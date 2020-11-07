<template>
  <div class="box">
    <header class="header">{{$route.query.brand}}</header>
    <div class="content">
      <van-sticky :offset-top="44">
        <van-dropdown-menu>
          <van-dropdown-item v-model="value1" :options="option1" @change="priceSort"/>
          <van-dropdown-item v-model="value2" :options="option2" />
          <van-dropdown-item title="筛选" ref="item">
            <van-cell center title="包邮">
              <template #right-icon>
                <van-switch v-model="switch1" size="24" active-color="#ee0a24" />
              </template>
            </van-cell>
            <van-cell center title="团购">
              <template #right-icon>
                <van-switch v-model="switch2" size="24" active-color="#ee0a24" />
              </template>
            </van-cell>
            <div style="padding: 5px 16px;">
              <van-button type="danger" block round >
                确认
              </van-button>
            </div>
          </van-dropdown-item>
        </van-dropdown-menu>
      </van-sticky>
      <Prolist :prolist="prolist"></Prolist>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Image as VanImage, DropdownMenu, DropdownItem, Switch, Cell, Button, Sticky } from 'vant'
import Prolist from './components/Prolist'
import { getCategoryBrandList } from '@/api/search'
Vue.use(VanImage)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Switch)
Vue.use(Cell)
Vue.use(Button)
Vue.use(Sticky)
export default {
  components: {
    Prolist
  },
  methods: {
    priceSort () {
      console.log(this.value1)
      if (this.value1 === 0) {
        this.prolist = this.oldlist
      } else if (this.value1 === 1) {
        this.prolist.sort((a, b) => {
          return a.price - b.price
        })
      } else {
        this.prolist.sort((a, b) => {
          return b.price - a.price
        })
      }
    }
  },
  data () {
    return {
      prolist: [],
      oldlist: [],
      value1: 0,
      value2: 'a',
      switch1: true,
      switch2: true,
      option1: [
        { text: '价格排序', value: 0 },
        { text: '价格升序', value: 1 },
        { text: '价格降序', value: 2 }
      ],
      option2: [
        { text: '销量排序', value: 'a' },
        { text: '销量升序', value: 'b' },
        { text: '销量降序', value: 'c' }
      ]
    }
  },
  created () {
    getCategoryBrandList({
      brand: this.$route.query.brand,
      category: this.$route.query.category
    }).then(res => {
      this.prolist = res.data.data
      // 此处使用深拷贝 备份数据
      this.oldlist = JSON.parse(JSON.stringify(this.prolist))
    })
  }
}
</script>
