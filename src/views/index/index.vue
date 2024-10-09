<template>
  <div class="container">
    <nav>
      <div class="banner">
        <router-link to="/introduce"><img src="../../assets/imgs/logo.png" alt="侨缘信使" class="logo"></router-link>
        <router-link to="/introduce" class="slider" @click.native="navigateAndSetActive('/introduce')">首页</router-link>
        <router-link to="/letter" class="slider" @click.native="navigateAndSetActive('/letter')">信海归舟</router-link>
        <router-link to="/game" class="slider" @click.native="navigateAndSetActive('/game')">侨趣乐园</router-link>
        <router-link to="/shop" class="slider" @click.native="navigateAndSetActive('/shop')">侨礼批坊</router-link>
        <div class="animation" :style="animationStyle"></div>
        <div v-if="isLoggedIn" style="display: inline-block; height: 50px ; width: 50px;">
          <img :src="userAvatar" style="height: 30px ; width: 30px; " alt="用户头像" class="avatar">
          <router-link to="/profile" class="profile">个人中心</router-link>
        </div>
        <div v-else style="display: inline-block; height: 50px ; width: 50px;">
          <router-link to="/login" class="login">登录</router-link>
          <router-link to="/register" class="register">注册</router-link>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import useUserStore from '@/store/modules/user'
export default {
  name: 'QiaopiIndex',
  data() {
    return {
      activeIndex: 0,
      positions: [150, 250, 350, 450] // 初始位置
    }
  },
  computed: {

    // 通过计算属性获取用户的登录状态和信息
    isLoggedIn() {
      const userStore = useUserStore()
      return !!userStore.token // 如果 token 存在，则表示已登录
    },
    userName() {
      const userStore = useUserStore()
      return userStore.name || '游客'
    },
    userAvatar() {
      const userStore = useUserStore()
      return userStore.avatar || require('@/assets/default-avatar.png') // 使用默认头像
    },
    animationStyle() {
      return {
        left: this.activeIndex >= 0 ? `${this.positions[this.activeIndex]}px` : '150px',
        backgroundColor: this.activeIndex === 0
          ? '#D3BF9E'
          : this.activeIndex === 1
            ? '#C7A981'
            : this.activeIndex === 2 ? '#B68C5C' : this.activeIndex === 3 ? '#a9773e' : 'transparent'
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
      '/game': 2,
      '/shop': 3
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
  min-height: 100vh;
  width: 100%;
  background-image: url(../../assets/imgs/background.jpg);
  background-size: 100% 100%;
  background-position: center center;
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
  position: relative;
  width: 100%;
  height: 60px;
  /* background-color: #772d2f; */
  background-image: url(../../assets/imgs/logobgd.jpg);
  background-repeat: repeat-x;
  font-size: 0;
  line-height: 60px;
}

nav .slider {
  width: 100px;
  height: 100%;
  line-height: 60px;
  font-size: 18px;
  display: inline-block;
  position: relative;
  z-index: 1;
  top: -10px;
  left: -225px;
  text-decoration: none;
  text-transform: uppercase;
  text-align: center;
  color: white;
  cursor: pointer;
}

nav .animation {
  position: absolute;
  height: 100%;
  top: 0;
  z-index: 0;
  transition: all 1s ease 0s;
  border-radius: 8px;
  width: 100px;
  left: 220px;
}

nav .slider:hover~.animation {
  background-color: #D3BF9E;
}

nav .slider:nth-child(2):hover~.animation {
  left: 250px;
  background-color: #C7A981;
}

nav .slider:nth-child(3):hover~.animation {
  left: 350px;
  background-color: #B68C5C;
}
nav .slider:nth-child(4):hover~.animation {
  left: 450px;
  background-color: #a9773e;
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
.profile {
  position: absolute;
  right: -5px;
  line-height: 60px;
  font-size: 13px;
  color: #ffffff;
  text-decoration: none;
}
.avatar {
  position: absolute;
  top: 15px;
  right: 60px;
}
 .isLoggedIn {
  position: relative;
 }
</style>
