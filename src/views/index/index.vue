<template>
<div class="container">
  <nav>
    <div class="banner">
      <router-link to="/introduce"><img src="../../assets/imgs/logo.png" alt="侨缘信使" class="logo"></router-link>
      <router-link to="/introduce" class="slider" @click.native="navigateAndSetActive('/introduce')">首页</router-link>
      <router-link to="/letter" class="slider" @click.native="navigateAndSetActive('/letter')">信海归舟</router-link>
      <router-link to="/game" class="slider" @click.native="navigateAndSetActive('/game')">侨趣乐园</router-link>
      <div class="animation" :style="animationStyle"></div>
      <router-link to="/login" class="login">登录</router-link>
      <router-link to="/register" class="register">注册</router-link>
    </div>
  </nav>
  <router-view></router-view>
</div>
</template>

<script>
export default {
  name: 'QiaopiIndex',
  data() {
    return {
      activeIndex: -1,
      positions: [150, 250, 350] // 初始位置
    }
  },
  computed: {
    animationStyle() {
      return {
        left: this.activeIndex >= 0 ? `${this.positions[this.activeIndex]}px` : '150px',
        backgroundColor: this.activeIndex === 0
          ? '#D3BF9E'
          : this.activeIndex === 1
            ? '#C7A981'
            : this.activeIndex === 2 ? '#B68C5C' : 'transparent'
      }
    }
  },
  methods: {
    setActive(index) {
      this.activeIndex = index
    },
    navigateAndSetActive(path) {
      if (this.$route.path !== path) {
        this.$router.push(path)
      }
    }
  },
  beforeRouteUpdate(to, from, next) {
    const paths = {
      '/introduce': 0,
      '/letter': 1,
      '/game': 2
      // 其他路由映射
    }
    const index = paths[to.path]
    if (index !== undefined) {
      this.setActive(index)
    }
    next()
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
    height: 900px;
    width: 100%;
    background-image: url(../../assets/imgs/background.jpg);
    background-size: cover;
    background-repeat: no-repeat;
}
.banner {
  position: relative;
  width: 1200px;
  height: 60px;
  margin: 0 auto;
}
.logo {
  position: absolute;
  width: 70px;
  height: 50px;
  top: 5px;
  left: 40px;
}
nav {
  margin: 0 auto;
  position: relative;
  width: 100%;
  height: 60px;
  background-color: #772d2f;
  font-size: 0;
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
}

nav .slider:hover ~ .animation {
  background-color: #D3BF9E;
}

nav .slider:nth-child(2):hover ~ .animation {
  left: 250px;
  background-color: #C7A981;
}

nav .slider:nth-child(3):hover ~ .animation {
  left: 350px;
  background-color: #B68C5C;
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
