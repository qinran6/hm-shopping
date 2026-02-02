import request from '@/utils/request'
// 获取商品详情
export const getProdetailData = (goodsId) => {
  return request.get('/goods/detail', {
    params: {
      goodsId
    }
  })
}
// 获取商品评论
export const getListRow = (goodsId) => {
  return request.get('/comment/listRows', {
    params: {
      goodsId,
      limit: 5
    }
  })
}
// 获取商品评价总数

// 商品评价列表

// 获取商品保障服务
