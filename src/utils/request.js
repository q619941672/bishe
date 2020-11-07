// 封装axios
import axios from 'axios'
import router from './../router'
import store from './../store'
// 开发环境 + 生产环境
// 开发环境 http://localhost:3000/api
// 生产环境 http://2003.wudaxun.top/api
// 判断当前的运行环境 process.env.NODE_ENV === 'development'  ==> cnpm run serve
// process.env.NODE_ENV === 'production'  ==> cnpm run build
const isDev = process.env.NODE_ENV === 'development'

// 自定义axios
// 所有的地址请求，如果更换了服务器，只需要修改baseURL的值
// http://localhost:3000/api/banner   ===》  真正实现时，只需要写 /banner即可，自动拼接
const request = axios.create({
  // baseURL: isDev ? 'http://localhost:3000/api' : 'http://2003.wudaxun.top/api',
  // baseURL: isDev ? '/api' : 'http://2003.wudaxun.top/api',
  baseURL: isDev ? 'http://localhost:3001/api' : 'http://39.100.30.156:3000/api',
  timeout: 6000
})

// 设置相关的拦截器
// 请求拦截器 - 统一显示loading效果
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么 - loading效果的展示，发送用户的身份信息 token
  // config.headers.common.token = localStorage.get('token')
  if (store.state.user.loginState) {
    config.headers.common.token = store.state.user.token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 响应的拦截器 - loading效果的消失
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么 --- loading效果的消失，根据用户的身份信息确认继续完成业务逻辑
  if (response.data.code === '10119') {
    router.push('/login')
  }
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default request
