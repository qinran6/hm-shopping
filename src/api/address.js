import request from '@/utils/request'
// 获取收货地址列表
export const getAddressList = () => {
  return request.get('/address/list')
}
// 获取默认地址id
export const getAddressId = () => {
  return request.get('/address/defaultId')
}
// 获取收获地址详情
export const getAddressDetail = (addressId) => {
  return request.get('/address/detail', {
    params: {
      addressId
    }
  })
}
// 添加收获地址
export const addAddress = (name, phone, region, detail) => {
  return request.post('/address/add', {
    form: {
      name,
      phone,
      region,
      detail
    }
  })
}
// 获取省市区
export const getArea = () => {
  return request.get('/region/tree')
}
