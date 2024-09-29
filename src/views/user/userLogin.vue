<template>
  <div class="container">
    <div class="login-wrapper">
      <div class="header">登录</div>
      <div class="form-wrapper">
        <input type="text" v-model="loginForm.username" name="username" placeholder="用户名" class="input-item">
        <input type="password" v-model="loginForm.password" name="password" placeholder="密码" class="input-item">
        <input type="text" v-model="loginForm.code" name="code" placeholder="请输入图片验证码" class="pic">
        <div class="picbox">
          <img :src="captchaImg" alt="验证码" @click="handleGetPicCode">
        </div>
        <router-link to="/forget" class="forget">忘记密码</router-link>
        <button @click="handleLogin" class="btn">Login</button>
      </div>
      <p>没有账号？<router-link to="/register">去注册</router-link></p>
    </div>
  </div>
</template>
<script>
import { getPicCode } from '@/api/login'
import useUserStore from '@/store/modules/user'

export default {
  data() {
    return {
      captchaImg: '',
      loginForm: {
        username: 'admin',
        password: '123456',
        code: '',
        uuid: ''
      }
    }
  },
  methods: {
    handleGetPicCode() {
      getPicCode().then(res => {
        this.captchaImg = 'data:image/gif;base64,' + res.data.img
        this.loginForm.uuid = res.data.uuid
      })
    },
    handleLogin() {
      const userStore = useUserStore()

      userStore.login(this.loginForm)
        .then(response => {
          // 测试登录成功
          console.log('Login successful:', response)
          // 跳转到首页
          this.$router.push({ name: 'Index' }) // Vue 2 中使用 this.$router 进行路由跳转
        }).catch(error => {
          // 测试登录失败
          console.log('Login failed:', error)
          this.handleGetPicCode() // 登录失败后重新获取验证码
        })
    }
  },
  created() {
    this.handleGetPicCode() // 组件创建时获取验证码
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

html {
  height: 100%;
}

body {
  height: 100%;
}

.container {
  position: relative;
  height: 810px;
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

.input-item:placeholder {
  text-transform: uppercase;
}

.pic {
  display: block;
  width: 50%;
  margin-bottom: 20px;
  border: 0;
  padding: 10px;
  border-bottom: 1px solid rgb(128, 125, 125);
  font-size: 15px;
  outline: none;
}

.btn {
  text-align: center;
  padding: 10px;
  margin: 0 auto;
  width: 100%;
  margin-top: 40px;
  background-image: linear-gradient(to right, #ECEED9, #B38554);
  color: #fff;
  background-color: #ECEED9;
  border-radius: 28px;
  border: 1px solid #ffffff;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 17px;
  padding: 16px 31px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #2f6627;
}

.msg {
  text-align: center;
  line-height: 88px;
}

p {
  font-size: 14px;
  color: #666666;
}

a {
  text-decoration-line: none;
  color: #A47348;
  font-size: 12px;
}

.remember {
  float: left;
  font-size: 12px;
  vertical-align: middle;
  margin-top: 5px;
}

span {
  color: #A47348;
}

.forget {
  float: right;
  font-size: 12px;
  color: #A47348;
}

.picbox {
  position: absolute;
  top: 300px;
  right: 100px;
  width: 20%;
}

.picbox img {
  width: 100%;
}
</style>
