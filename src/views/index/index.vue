<template>
<div class="container">
  <nav>
    <div class="banner">
       <router-link to="/index" class="slider">首页</router-link>
      <router-link to="/letter" class="slider">写信</router-link>
      <router-link to="/game" class="slider">游戏</router-link>
          <div class="animation" ref="slider"></div>
         <router-link to="/login" class="login">登录</router-link>
    <router-link to="/register" class="register">注册</router-link>
    </div>
  </nav>
  <router-view></router-view>
</div>

</template>

<script>
// import instance from '@/utils/request'
export default {
  name: 'QiaopiIndex'
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
    background-color: #ECEED9;
}
.banner {
  position: relative;
  width: 1200px;
  height: 60px;
  margin: 0 auto;
}
nav {
  margin: 0 auto;
  position: relative;
  width: 100%;
  height: 60px;
  background-image: linear-gradient(to right, #ECEED9, #B38554);
  font-size: 0;
  box-shadow: 1px 1px 1px linear-gradient(to right, #ECEED9, #B38554);
}

nav .slider {
  width: 100px;
  height: 100%;
  line-height: 60px;
  font-size: 18px;
  display:inline-block;
  position: relative;
  z-index:1;
  left: -300px;
  text-decoration:none;
  text-transform:uppercase;
  text-align:center;
  color:white;
  cursor:pointer;
}

nav .animation{
  position:absolute;
  height:100%;
  top:0;
  z-index:0;
  transition:all 1s ease 0s;
  border-radius: 8px;
  width: 100px;
  left: 150px;
  /* background-color:#eceed9e8; */
}

nav .slider:hover ~ .animation {
  left: 150px;
  background-color: #f0db96;
}

nav .slider:nth-child(2):hover ~ .animation {
  left: 250px;
  background-color: #efbe64da;
}

nav .slider:nth-child(3):hover ~ .animation {
  left: 350px;
  background-color: #dfa929;
}
.login {
  position: absolute;
  right: 100px;
  line-height: 60px;
  font-size: 15px;
  color: #f0db96;
  text-decoration: none;
}
.register {
  position: absolute;
  right: 50px;
  line-height: 60px;
  font-size: 15px;
  color: #f0db96;
  text-decoration: none;
}
</style>
