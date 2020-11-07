<template>
  <div class="container">
    <router-view></router-view>
    <router-view name="footer"></router-view>
  </div>
</template>

<style lang="scss">
* { padding: 0; margin: 0; list-style: none;}
html, body, .container { width: 100%; height: 100%;}
// html { font-size: 100px; } // 如果rem中html根结点的字体大小是统一的，那么和写px没有什么区别
html { font-size: 26.66666666666666vw; } // 假设设计稿是750*1334（iphone6），也就是设计稿以iphone6为基准值 100 / 375 * 100 = 26.66666666666666vw
// 如果是横屏状态，字体大小固定为 100px ---  媒体查询
@media all and (orientation : landscape) {
  html { font-size: 100px;}
}
body { font-size: 12px; }
.container {
  max-width: 640px; // 适配
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background-color: #efefef;
  .box {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: auto;
    .header {
      height: 0.44rem; // 44px
      background-color: #f66;
    }
    .content {
      flex: 1;
      overflow: auto; // 超过内容产生滚动条
    }
  }
  .footer {
    height: 0.5rem; // 50px
    background-color: #efefef;
    ul {
      width: 100%; height: 100%; display: flex;
      li {
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        // & 代表的就是 li的标签的样式
        &.router-link-exact-active.router-link-active {
          color: #f66;
        }

        span {
          font-size: 24px;
        }
      }
    }
  }
}
</style>
