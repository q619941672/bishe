import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Footer from '../components/Footer.vue'
Vue.use(VueRouter)

// 定义路由的规则 --- 将组件映射到路由
const routes = [
  {
    // 路由的匹配从上到下，匹配到就立马停止 -  路由的重定向 https://router.vuejs.org/zh/guide/essentials/redirect-and-alias.html
    path: '/', redirect: '/home'
  },
  {
    // name 属性 - 命名路由 https://router.vuejs.org/zh/guide/essentials/named-routes.html
    // component属性 - 路由的懒加载 https://router.vuejs.org/zh/guide/advanced/lazy-loading.html
    // path: '/home', name: 'home', component: () => import(/* webpackChunkName: "base" */ '../views/home/index.vue')
    path: '/home',
    name: 'home',
    components: {
      default: () => import(/* webpackChunkName: "base" */ '../views/home/index.vue'),
      footer: Footer
    }
  },
  {
    // path: '/kind', name: 'kind', component: () => import(/* webpackChunkName: "base" */ '../views/kind/index.vue')
    path: '/kind',
    name: 'kind',
    components: {
      default: () => import(/* webpackChunkName: "base" */ '../views/kind/index.vue'),
      footer: Footer
    }
  },
  {
    // path: '/cart', name: 'cart', component: () => import(/* webpackChunkName: "base" */ '../views/cart/index.vue')
    path: '/cart',
    name: 'cart',
    components: {
      default: () => import(/* webpackChunkName: "base" */ '../views/cart/index.vue'),
      footer: Footer
    }
    // beforeEnter: (to, from, next) => {
    //   if (localStorage.getItem('loginState') === 'true') {
    //     next()
    //   } else {
    //     next('/login')
    //   }
    // }
  },
  {
    // path: '/user', name: 'user', component: () => import(/* webpackChunkName: "base" */ '../views/user/index.vue')
    path: '/user',
    name: 'user',
    components: {
      default: () => import(/* webpackChunkName: "base" */ '../views/user/index.vue'),
      footer: Footer
    }
  },
  {
    // 如果没有底部，则也可以不写 components，也可以写成  components，但是只写default
    path: '/register', name: 'register', component: () => import(/* webpackChunkName: "user" */ '../views/register/index.vue')
  },
  {
    // 如果没有底部，则也可以不写 components，也可以写成  components，但是只写default
    path: '/login', name: 'login', component: () => import(/* webpackChunkName: "user" */ '../views/login/index.vue')
  },
  {
    // 详情没有 通用的底部，需要所有的产品共用它，需要唯一的参数 ----- 动态的路由匹配
    path: '/detail/:proid', name: 'detail', component: () => import(/* webpackChunkName: "user" */ '../views/detail/index.vue')
  },
  {
    // 确认订单，依靠的时间 + userid
    path: '/order/:time', name: 'order', component: () => import(/* webpackChunkName: "order" */ '../views/order/index.vue')
  },
  {
    // 地址选择路由
    path: '/orderaddresslist/:time', name: 'orderaddresslist', component: () => import(/* webpackChunkName: "order" */ '../views/order/list.vue')
  },
  {
    // 添加地址路由
    path: '/orderaddressadd/:time', name: 'orderaddressadd', component: () => import(/* webpackChunkName: "order" */ '../views/order/add.vue')
  },
  {
    // 添加支付路由
    path: '/pay/:time', name: 'pay', component: () => import(/* webpackChunkName: "order" */ '../views/pay/index.vue')
  },
  {
    // 搜索列表
    path: '/searchlist', name: 'searchlist', component: () => import(/* webpackChunkName: "order" */ '../views/search/list.vue')
  }
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

// 全局的导航守卫
// router.beforeEach((to, from, next) => {
//   // 后端管理系统时，使用的全局导航守卫居多
//   console.log(to)
//   if (to.name === 'cart') {
//     if (localStorage.getItem('loginState') === 'true') {
//       next()
//     } else {
//       next('/login')
//     }
//   } else {
//     next()
//   }
// })

export default router
