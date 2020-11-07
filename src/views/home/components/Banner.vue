<template>
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="item of bannerlist" :key="item.bannerid">
      <van-image :src="item.bannerimg" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  props: {
    bannerlist: {
      type: Array,
      required: true
    }
  }
}
</script>
