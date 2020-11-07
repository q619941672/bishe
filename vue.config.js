// 实际上内层使用的是webpack
// webpack 又是基于node 的一个自动任务的运行器，模块化/组件化开发的利器
module.exports = {
  publicPath: './', // 默认的值 是  /
  // 设置服务器代理，解决开发环境下的跨域问题
  devServer: {
    // 代理
    proxy: 'http://localhost:3000'
  }
}