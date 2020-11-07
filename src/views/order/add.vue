<template>
  <div class="box">
    <header class="header">
      <van-nav-bar
        title="添加地址"
        left-arrow
        @click-left="$router.back()"
      />
    </header>
    <div class="content">
      <van-address-edit
        :area-list="areaList"
        show-set-default
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
      />
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { NavBar, Toast, AddressEdit } from 'vant'
import areaList from '@/utils/area'
import { addressAdd, updateOrderAddress } from '@/api/address'
Vue.use(NavBar)
Vue.use(Toast)
Vue.use(AddressEdit)
export default {
  data () {
    return {
      areaList: areaList
    }
  },
  methods: {
    formatAddess (province, city, county) {
      let str = ''
      province === city ? str = province + county : str = province + city + county
      return str
    },
    onSave (content) {
      console.log('save', content)
      content.userid = localStorage.getItem('userid')
      addressAdd(content).then(res => {
        // 表示就是插入数据已经成功
        // 返回确认订单页面（不要忘记先修改订单的地址)
        updateOrderAddress({
          userid: content.userid,
          time: this.$route.params.time,
          name: content.name,
          tel: content.tel,
          address: this.formatAddess(content.province, content.city, content.county) + ' ' + content.addressDetail
        }).then(res1 => {
          // 修改地址成功，返回确定订单页面
          this.$router.go(-2)
        })
      })
    }
  },
  mounted () {
  }
}
</script>
