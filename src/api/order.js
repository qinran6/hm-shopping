import request from '@/utils/request'
// 订单结算确认
// mode ：cart => obj {cartId}
// mode ：buyNow => obj {goodsId,goodsNum,goosSkuId}
export const checkOrder = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      mode, // buyNow立即购买 cart购物车
      delivery: 10, // 10快递配送 20上门自提
      shopId: 0, // 自提门店ID
      couponId: 0, // 优惠券ID
      isUserPoints: 0, // 是否使用积分抵扣（1使用 0不使用）
      ...obj // 将传递过来的参数对象 动态展开
    }
  })
}
// 提交订单
export const submitOrder = (mode, remark, obj) => {
  return request.post('/checkout/submit', {
    mode, // buyNow立即购买 cart购物车
    delivery: 10, // 10快递配送 20上门自提
    shopId: 0, // 自提门店ID
    couponId: 0, // 优惠券ID
    isUserPoints: 0, // 是否使用积分抵扣（1使用 0不使用）
    payType: 10, // 10：余额支付
    remark, // 留言
    ...obj // 将传递过来的参数对象 动态展开
  })
}
// 我的订单
export const getMyOrder = (dataType, page) => {
  return request.get('/order/list', {
    params: {
      dataType,
      page
    }
  })
}
