import { getCartList } from '@/api/cart'

export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  getters: {
    // 所有商品累加数
    cartCount (state) {
      return state.cartList.reduce((sum, item) => {
        return sum + item.goods_num
      }, 0)
    },
    // 选中的商品
    // selCartList (state) {
    //   return state.cartList.filter(item => item.isChecked)
    // },
    // 选中的商品总价
    totalPrice (state) {
      return state.cartList.reduce((sum, item) => {
        return item.isChecked ? sum + item.goods.goods_price_min * item.goods_num : sum + 0
      }, 0).toFixed(2)
    },
    // 选中的商品数
    totalCount (state) {
      return state.cartList.reduce((sum, item) => {
        return item.isChecked ? sum + item.goods_num : sum + 0
      }, 0)
    },
    // 判断是否全选
    isAllCheck (state) {
      return state.cartList.every(item => item.isChecked)
    }
  },
  mutations: {
    setCartList (state, newList) {
      state.cartList = newList
    },
    // 点击复选框重置状态
    toggleCheck (state, id) {
      const goods = state.cartList.find(item => item.goods_id === id)
      goods.isChecked = !goods.isChecked
    },
    // 点击全选，重置状态
    toggleAllCheck (state, flag) {
      state.cartList.forEach(item => { item.isChecked = flag })
    }
  },
  // 处理异步操作
  actions: {
    async getCartAction (context) {
      const res = await getCartList()
      res.data.list.forEach(element => {
        element.isChecked = true
      })
      console.log(res)
      context.commit('setCartList', res.data.list)
    }
  }
}
