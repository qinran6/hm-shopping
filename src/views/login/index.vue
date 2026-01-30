<template>
  <div class="login">
    <!-- 头部 -->
    <van-nav-bar
      title="会员登录"
      left-arrow
      @click-left="$router.go('-1')"
    />
    <!-- 主体 -->
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input v-model="mobilePhone" class="inp" maxlength="11" placeholder="请输入手机号码" type="text">
        </div>
        <div class="form-item">
          <input v-model="picCode" class="inp" maxlength="5" placeholder="请输入图形验证码" type="text">
          <!-- <img src="@/assets/code.png" alt=""> -->
          <img @click="picUpdate" :src="picUrl" alt="">
        </div>
        <div class="form-item">
          <input v-model="msgCode" class="inp" placeholder="请输入短信验证码" type="text">
          <button @click="getCode">
            {{ second === totalSecond ? '获取验证码' : second + '秒后重新发送'}}
          </button>
        </div>
      </div>

      <div @click="Login" class="login-btn">登录</div>
    </div>
  </div>
</template>

<script>
import { codeLogin, getMsgCode, getPicCode } from '@/api/login'
import { Toast } from 'vant'

export default {
  name: 'LoginIndex',
  data () {
    return {
      picUrl: '',
      picCode: '',
      picKey: '',
      mobilePhone: '',
      totalSecond: 60,
      second: 60,
      timer: null,
      msgCode: ''
    }
  },
  async created () {
    const res = await getPicCode()
    this.picUrl = res.data.base64
    this.picKey = res.data.key
  },
  methods: {
    // 获取图形验证码
    async picUpdate () {
      const res = await getPicCode()
      this.picUrl = res.data.base64
      this.picKey = res.data.key
      // Toast('获取图形验证码成功')
    },
    // 手机号和图形验证码校验
    validFn () {
      if (!/^1[3-9]\d{9}$/.test(this.mobilePhone)) {
        this.$toast('请输入正确的手机号')
        this.mobilePhone = ''
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('请输入合理的图形验证码')
        this.picCode = ''
        return false
      }
      return true
    },
    // 获取短信验证码
    async getCode () {
      if (!this.validFn()) return
      if (!this.timer && this.totalSecond === this.second) {
        const res = await getMsgCode(this.picCode, this.picKey, this.mobilePhone)
        Toast(res.message)
        this.timer = setInterval(() => {
          if (this.second > 1) {
            this.second--
          } else {
            clearInterval(this.timer)
            this.timer = null
            this.second = this.totalSecond
          }
        }, 1000)
      }
    },
    // 登录
    async Login () {
      if (!this.validFn()) return
      if (!/^\d{6}$/.test(this.msgCode)) {
        this.$toast('请输入正确的短信验证码')
        return
      }
      const res = await codeLogin(this.mobilePhone, this.msgCode)
      console.log(res)
      if (res.status === 200) {
        this.$toast(res.message)
        this.$router.push('/')
      } else {
        this.picUpdate()
        this.picCode = ''
        this.msgCode = ''
        Toast('请输入正确的短信验证码')
      }
    }
  },
  destroyed () {
    clearInterval(this.timer)
    this.timer = null
    this.second = this.totalSecond
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
