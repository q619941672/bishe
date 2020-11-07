import { getStorage, setStorage } from '@/utils/storage'
import { Toast } from 'vant'
import { login } from '@/api'
const store = {
  namespaced: true, // 命名空间，调用actions和mutations时区分用的
  state: {
    // 刷新页面，vuex的数据就会重新计算 ---- 刷新页面，状态管理器数据会丢失
    loginState: getStorage('loginState') === 'true' || false,
    token: getStorage('token') || '',
    userid: getStorage('userid') || ''
  },
  // 处理异步操作
  actions: {
    async login (context, data) { // context类似于this，但是不是this
      const res = await login(data)
      if (res.data.code === '10004') {
        Toast('请先注册账户')
      } else if (res.data.code === '10005') {
        Toast('密码错误')
      } else {
        // 修改vuex 数据
        context.commit('change_login_state', true)
        context.commit('change_token', res.data.data.token)
        context.commit('change_userid', res.data.data.userid)
        setStorage('loginState', true)
        setStorage('userid', res.data.data.userid)
        setStorage('token', res.data.data.token)
      }
    }
  },
  mutations: { // 唯一改变数据的方式 - 提交mutations
    change_login_state (state, data) {
      state.loginState = data
    },
    change_token (state, data) {
      state.token = data
    },
    change_userid (state, data) {
      state.userid = data
    }
  }
}

export default store
