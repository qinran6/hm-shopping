import { getCartList } from '@/api/cart'

export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  getters: {
  },
  mutations: {
    setCartList (state, newList) {
      state.cartList = newList
    }
  },
  // 处理异步操作
  actions: {
    async getCartAction (context) {
      const res = await getCartList()
      res.data.list.array.forEach(element => {
        element.isChecked = true
      })
      console.log(res)
      context.commit('setCartList', res.data.list)
    }
  }
}
