import { getCartList } from '@/api'
export default {
  namespaced: true,
  state: {
    cartlist: []
  },
  actions: {
    async getCartList (context, data) {
      // console.log('context', context)
      // console.log('data', data)
      const res = await getCartList({ userid: data })
      context.commit('change_cart_list', res.data.data)
    }
  },
  mutations: {
    change_cart_list (state, data) {
      state.cartlist = data
    }
  }
}
