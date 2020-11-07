import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      userid: ({ user: { userid } }) => userid,
      loginState: ({ user: { loginState } }) => loginState
    })
  }
}
