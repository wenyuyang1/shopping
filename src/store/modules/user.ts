interface UserInfo {
  token: string,
  userId: string
}
import { GET_TOKEN } from '@/utils/storage'
export default {
  namespaced: true,
  state() {
    return {
      userInfo: GET_TOKEN(),
    }
  },
  mutations: {
    setUserInfo(state: any, obj: UserInfo) {
      state.userInfo = obj
    },
  },
  actions: {
    loginout(context: any) {
      context.commit('setUserInfo', {})
      context.commit('cart/setCartList', [], { root: true })
    }
  }
}