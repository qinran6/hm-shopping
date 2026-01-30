import request from '@/utils/request'
// 获取图形验证码
export const getPicCode = () => {
  return request.get('/captcha/image')
}
// 获取短信验证码
export const getMsgCode = (picCode, picKey, mobilePhone) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode: picCode,
      captchaKey: picKey,
      mobile: mobilePhone
    }
  })
}
// 登录接口
export const codeLogin = (mobile, smsCode) => {
  return request.post('/passport/login', {
    form: {
      isParty: false,
      mobile,
      partyData: {},
      smsCode
    }
  })
}
