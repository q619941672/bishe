export default {
  namespaced: true,
  state: {
    cartlist: []
  },
  actions: {},
  mutations: {
    change_cart_list (state, data) {
      state.cartlist = data
    }
  }
}
