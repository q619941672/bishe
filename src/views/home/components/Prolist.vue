<template>
  <div class="prolist">
    <van-image src="https://img11.360buyimg.com/jdphoto/jfs/t1/31601/22/15554/14040/5cc2a86fEbdb1098b/88174b36f85283b6.png"/>
    <!-- <ul>
      <li v-for="item of prolist" :key="item.proid">
        <div class="itemimg">
          <van-image :src="item.proimg" />
        </div>
        <div class="iteminfo">
          <p class="van-multi-ellipsis--l2">{{ item.proname }}</p>
          <p>¥{{ item.price }}</p>
        </div>
      </li>
    </ul> -->
    <!-- <ul> -->
      <!-- 命名路由的方式 -->
      <!-- <router-link :to="{ name: 'detail', params: { proid: item.proid } }" tag="li" v-for="item of prolist" :key="item.proid"> -->
      <!-- 字符串拼接方式 -->
      <!-- <router-link :to="'/detail/' + item.proid" tag="li" v-for="item of prolist" :key="item.proid">
        <div class="itemimg">
          <van-image :src="item.proimg" />
        </div>
        <div class="iteminfo">
          <p class="van-multi-ellipsis--l2">{{ item.proname }}</p>
          <p>¥{{ item.price }}</p>
        </div>
      </router-link> -->
    <!-- </ul> -->
    <ul>
      <li v-for="item of prolist" :key="item.proid" @click="toDetail(item.proid)">
        <div class="itemimg">
          <van-image :src="item.proimg" />
        </div>
        <div class="iteminfo">
          <p class="van-multi-ellipsis--l2">{{ item.proname }}</p>
          <p>¥{{ item.price }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    prolist: {
      type: Array,
      required: true
    }
  },
  methods: {
    toDetail (proid) {
      // this.$router.push('/detail/' + proid) // 字符串拼接
      this.$router.push({ name: 'detail', params: { proid: proid } })
    }
  }
}
</script>
<style lang="scss" scoped>
.prolist {
  ul {
    overflow: hidden;
    li {
      width: 49%;
      height: 2.67rem;
      float: left;
      margin: 0.5%;
      background-color: #fff;
      .itemimg {
        height: 1.67rem;
        overflow: hidden;
        .van-image {
          width: 100%;
        }
      }
      .iteminfo {
        padding: 5px 8px;
      }
    }
  }
}
</style>
