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
