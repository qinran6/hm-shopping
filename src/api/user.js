import request from '@/utils/request'
// 获取用户信息
export const getUserInfoDetail = () => {
  return request.get('/user/info')
}
