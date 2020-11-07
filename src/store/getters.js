export default {
  // totalNum (state) {
  //   return state.cart.cartlist.reduce((sum, item) => {
  //     return item.flag ? sum + item.num : sum + 0
  //   }, 0)
  // }
  totalNum: ({ cart: { cartlist } }) => cartlist.reduce((sum, item) => item.flag ? sum + item.num : sum + 0, 0)
}
