import request from '@/utils/request'
// 获取购物车商品总数量
export const getCartCount = () => {
  return request.get('/cart/total')
}
// 添加商品到购物车
export const addGoodsCart = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/add', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}
// 获取购物车商品列表
export const getCartList = () => {
  return request.get('/cart/list')
}
// 更新购物车商品
export const updateCartList = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/update', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}
// 删除购物车商品
export const deleteCartGood = (cartIds) => {
  return request.post('/cart/clear', {
    cartIds
  })
}
