<template>
  <div class="box">
    <header class="header">kind header</header>
    <div class="content">
      <van-sidebar v-model="activeKey">
        <van-sidebar-item v-for="(item, index) of categorylist" :key="index" :title="item" @click="selectBrand(item)"/>
      </van-sidebar>
      <div class="brandbox">
        <van-grid :column-num="3" :border="false">
          <van-grid-item v-for="(item, index) of brandlist" :key="index" :icon="item.logo" :text="item.brand" @click="tolist(item.brand)"/>
        </van-grid>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Sidebar, SidebarItem, Grid, GridItem } from 'vant'
import { getCategory, getCategoryLogo } from '@/api/search'
Vue.use(Sidebar)
Vue.use(SidebarItem)
Vue.use(Grid)
Vue.use(GridItem)
export default {
  data () {
    return {
      activeKey: 0,
      categorylist: [],
      brandlist: []
    }
  },
  methods: {
    tolist (brand) {
      this.$router.push(`/searchlist?brand=${brand}&category=${this.categorylist[this.activeKey]}`)
    },
    selectBrand (item) {
      console.log(item)
      getCategoryLogo({
        category: item
      }).then(res => {
        this.brandlist = res.data.data
      })
    }
  },
  created () {
    getCategory().then(res => {
      this.categorylist = res.data.data
      this.selectBrand(this.categorylist[0])
    })
  }
}
</script>

<style lang="scss" scoped>
.content {
  background-color: #fff;
  display: flex;
  .van-sidebar {
    width: 80px;
  }
  .brandbox {
    flex: 1;
    height: 100%;
    overflow: auto;
  }
}
</style>
