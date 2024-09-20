<template>
  <div class="container">
    <div class="login-wrapper">
      <div class="header">注册</div>
      <div class="form-wrapper">
        <input v-model="email" type="text" name="username" placeholder="邮箱号" class="input-item">
        <span class="alert" v-if="isMistake">请输入正确的邮箱号</span>
        <input v-model="password" type="password" name="password" placeholder="密码" class="input-item">
        <input v-model="confirmPassword" type="password" name="repassword" placeholder="再次确认密码" class="input-item">
        <span class="isSame" v-if="isSame">两次密码不一致请重新输入</span>
        <input type="text" v-model="code" name="repassword" placeholder="请输入邮箱验证码" class="email">
        <button @click="sendCode" :disabled="second !== totalSecond" class="code">{{ second === totalSecond ? '获取验证码' :
          second + '秒后重新发送' }}</button>
        <button @click="register" class="btn" :disabled="isFormInvalid">Register</button>
        <p>已有账号？<router-link to="/">去登录</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'IndexReg',
  data() {
    return {
      isMistake: false,
      totalSecond: 60, // 总秒数
      second: 60, // 当前秒数
      timer: null, // 定时器 id
      email: '', // 邮箱号
      password: '', // 密码
      confirmPassword: '', // 再次确认密码
      code: '',
      uuid: ' ',
      responseMessage: null,
      isSame: false
    }
  },
  methods: {
    // 校验邮箱是否合法
    validFn() {
      if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$/.test(this.email)) {
        this.isMistake = true
        return false
      } else {
        this.isMistake = false
        return true
      }
    },
    validatePassword() {
      if (this.password !== this.confirmPassword) {
        this.isSame = true
        return false
      } else {
        this.isSame = false
        return true
      }
    },
    destroyed() {
      clearInterval(this.timer)
    },
    // 开始验证码倒计时
    startCountdown() {
      this.second = this.totalSecond
      if (!this.timer && this.second === this.totalSecond) {
        this.timer = setInterval(() => {
          this.second--
          if (this.second <= 0) {
            clearInterval(this.timer)
            this.timer = null
            this.second = this.totalSecond
          }
        }, 1000)
      }
    },
    // 获取短信验证码
    async sendCode() {
      if (!this.validFn()) {
        return
      }
      if (!this.validatePassword()) {
        return
      }
      try {
        const response = await axios.get('/api/user/sendCode', { params: { email: this.email } })
        if (response.data.code === 200) {
          this.startCountdown()
          this.uuid = response.data.data.uuid
          this.responseMessage = response.data.msg
        } else {
          this.responseMessage = response.data.msg
          alert('发送过于频繁请稍后再试')
        }
      } catch (error) {
        this.responseMessage = '发送验证码失败: ' + error
      }
    },
    // 用户注册请求
    async register() {
      if (!this.validFn() || !this.validatePassword()) {
        return
      }
      try {
        const response = await axios.post('/api/user/register', {
          username: this.email,
          password: this.password,
          code: this.code,
          uuid: this.uuid,
          confirmPassword: this.confirmPassword
        })
        this.responseMessage = response.data.msg || '注册成功'
        alert('注册成功')
      } catch (error) {
        this.responseMessage = '注册失败: ' + error.response.data.msg
      }
    }
  },
  computed: {
    // 计算属性，用于判断表单是否有效
    isFormInvalid() {
      return !this.validFn() || !this.validatePassword() || this.isMistake || this.isSame
    }
  }
}
</script>

<style scoped>
html {
  height: 100%;
}

body {
  height: 100%;
}

.container {
  position: relative;
  height: 800px;
  width: 100%;
  background-image: linear-gradient(to right, #ECEED9, #B38554);
}

.login-wrapper {
  background-color: #fff;
  width: 358px;
  height: 588px;
  border-radius: 15px;
  padding: 0 50px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.header {
  font-size: 38px;
  font-weight: bold;
  text-align: center;
  line-height: 200px;
}

.input-item {
  display: block;
  width: 100%;
  margin-bottom: 20px;
  border: 0;
  padding: 10px;
  border-bottom: 1px solid rgb(128, 125, 125);
  font-size: 15px;
  outline: none;
}

.email {
  display: block;
  width: 50%;
  margin-bottom: 20px;
  border: 0;
  padding: 10px;
  border-bottom: 1px solid rgb(128, 125, 125);
  font-size: 15px;
  outline: none;
}

.input-item:placeholder {
  text-transform: uppercase;
}

.btn {
  text-align: center;
  padding: 10px;
  width: 100%;
  margin-top: 40px;
  background-image: linear-gradient(to right, #ECEED9, #B38554);
  color: #fff;
  margin: 0 auto;
      background-color:#ECEED9;
    border-radius:28px;
    border:1px solid #ffffff;
    display:inline-block;
    cursor:pointer;
    color:#ffffff;
    font-family:Arial;
    font-size:17px;
    padding:16px 31px;
    text-decoration:none;
    text-shadow:0px 1px 0px #2f6627;
}

.msg {
  text-align: center;
  line-height: 88px;
}

p {
  font-size: 14px;
}
a {
    text-decoration-line: none;
    color: #A47348;
    font-size: 12px;
}

.code {
  position: absolute;
  top: 375px;
  right: 80px;
  width: 110px;
  height: 40px;
  border-radius: 40px;
  border: 0px;
  color: #ECEED9;
  background-color: #C2A278;
}

.alert {
  position: absolute;
  top: 240px;
  left: 60px;
  color: rgba(168, 4, 4, 0.873);
  font-size: 10px;
}

.isSame {
  position: absolute;
  top: 360px;
  left: 60px;
  color: rgba(168, 4, 4, 0.873);
  font-size: 10px;
}
</style>
