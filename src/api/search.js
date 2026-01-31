import request from '@/utils/request'
export const getGoodsList = (obj) => {
  const { categoryId, goodsName, page, sortType, sortPrice } = obj
  return request.get('/goods/list', {
    params: {
      categoryId,
      goodsName,
      page,
      sortType,
      sortPrice
    }
  })
}
