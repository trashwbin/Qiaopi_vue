<template>
  <div class="container">
    <nav>
      <div class="banner">
        <router-link to="/introduce"><img src="../../assets/imgss/logo.webp" alt="侨缘信使" class="logo"></router-link>
        <router-link to="/introduce" class="slider" :class="{ active: isActive('/introduce') }"
          @click.native="navigateAndSetActive('/introduce')">首页</router-link>
        <router-link to="/letter" class="slider" :class="{ active: isActive('/letter') }"
          @click.native="navigateAndSetActive('/letter')">信海归舟</router-link>
        <router-link to="/game" class="slider" :class="{ active: isActive('/game') }"
          @click.native="navigateAndSetActive('/game')">侨趣乐园</router-link>
        <router-link to="/shop" class="slider" :class="{ active: isActive('/shop') }"
          @click.native="navigateAndSetActive('/shop')">侨礼批坊</router-link>
        <div class="animation" :style="animationStyle"></div>
        <div class="money" v-if="isLoggedIn"><img src="../../assets/imgss/pigmoney.webp" alt="猪仔钱"></div>
        <p class="pig" v-if="isLoggedIn">猪仔钱：{{ money }}</p>
        <div v-if="isLoggedIn" class="avatar-container">
          <el-dropdown style="height: 40px;" @command="handleCommand" placement="bottom">
            <el-avatar :src="userAvatar" shape="square" fit="fill"></el-avatar>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="profile">个人中心</el-dropdown-item>
              <el-dropdown-item command="logout">切换账号</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div v-else>
          <router-link to="/login" class="login">登录</router-link>
          <router-link to="/register" class="register">注册</router-link>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import { getUserMoney } from '@/api/user'
import useUserStore from '@/store/modules/user'

export default {
  name: 'QiaopiIndex',
  data() {
    return {
      currentRoute: this.$route.path,
      money: 0,
      showMenu: false,
      activeIndex: 0,
      positions: [150, 250, 350, 450] // 初始位置
    }
  },
  computed: {
    // 通过计算属性获取用户的登录状态和信息
    isLoggedIn() {
      return this.isLoggedInCheck() // 如果 token 存在，则表示已登录
    },
    userName() {
      const userStore = useUserStore()
      return userStore.name || '游客'
    },
    userAvatar() {
      const userStore = useUserStore()
      if (!userStore.avatar) {
        userStore.getUserInfo()
      }
      return userStore.avatar || require('@/assets/default-avatar.webp') // 使用默认头像
    },
    animationStyle() {
      return {
        left: this.activeIndex >= 0 ? `${this.positions[this.activeIndex]}px` : '150px',
        backgroundColor: this.activeIndex === 0
          ? '#D3BF9E'
          : this.activeIndex === 1
            ? '#C7A981'
            : this.activeIndex === 2 ? '#B68C5C' : this.activeIndex === 3 ? '#B68C5C' : 'transparent'
      }
    }
  },
  methods: {
    handleCommand(command) {
      if (command === 'logout') {
        const userStore = useUserStore()
        userStore.logOut()
        this.$router.push('/login')
      } else if (command === 'profile') {
        this.$router.push('/profile')
      }
    },
    isLoggedInCheck() {
      const userStore = useUserStore()
      if (userStore.token) {
        getUserMoney().then(
          res => {
            // 将获取到的钱赋值给组件的 money 数据属性
            this.money = res.data.money
          }
          // 调用异步函数
        )
      }
      return userStore.token
    },
    setActive(index) {
      this.activeIndex = index
    },
    navigateAndSetActive(path) {
      if (this.currentRoute !== path) {
        this.currentRoute = path
        this.$router.push(path).catch(err => {
          // 忽略 NavigationDuplicated 错误
          if (err.name !== 'NavigationDuplicated') {
            throw err
          }
        })
      }
    },
    isActive(path) {
      return this.currentRoute === path
    },
    updateActiveIndex() {
      const paths = {
        '/introduce': 0,
        '/letter': 1,
        '/game': 2,
        '/shop': 3,
        '/write': 1,
        '/drifting': 1,
        '/receive': 1,
        '/profile': -1,
        '/know': 2
      }
      const index = paths[this.$route.path]
      if (index !== undefined) {
        this.setActive(index)
      }
    }
  },
  watch: {
    $route(to) {
      this.currentRoute = to.path
      this.updateActiveIndex()
    }
  },
  created() {
    this.currentRoute = this.$route.path
    this.updateActiveIndex()
  },
  beforeRouteUpdate(to, from, next) {
    this.updateActiveIndex()
    next()
  }
}
</script>

<style scoped>
* {
  margin: 0;
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
  background-image: url(../../assets/imgss/background.webp);
  /* background: url(https://www.taoyuantudigong.org.tw/main/wp-content/themes/project-theme/src/img/yellow.png) 0 0 / 400px auto repeat, #f9f9f9; */
  background-size: 100% 100%;
  background-position: center center;
}

.banner {
  position: relative;
  width: 1200px;
  height: 60px;
  box-sizing: border-box;
  padding: 10px;
  margin: 0 auto;
  line-height: 60px;
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
  background-image: url(../../assets/imgss/logobgd.webp);
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
  z-index: 5;
  top: -10px;
  left: -250px;
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
  left: 400px;
  background-color: #875d2d;
}

.login {
  position: absolute;
  right: 50px;
  top: 0px;
  line-height: 60px;
  font-size: 15px;
  color: #f0db96;
  text-decoration: none;
}

.register {
  position: absolute;
  right: 10px;
  top: 0;
  line-height: 60px;
  font-size: 15px;
  color: #f0db96;
  text-decoration: none;
}

.money {
  position: absolute;
  top: 10px;
  right: 180px;
  width: 30px;
  height: 20px;
}

.money img {
  width: 100%;
  height: 100%;
}

.pig {
  position: absolute;
  top: 0;
  left: 1020px;
  font-size: 12px;
  color: #ffffff;
}

/* .profile {
  font-size: 13px;
  color: #ffffff;
  text-decoration: none;
}

.logout {
  font-size: 13px;
  color: #ffffff;
  text-decoration: none;
} */

.avatar-container {
  width: 40px;
  /* 头像容器的宽度 */
  position: absolute;
  top: 10px;
  right: 30px;
  display: inline-block;
}

.avatar {
  /* position: absolute;
  top: -30px;
  right: -360px; */
  z-index: 10;
}

.dropdown {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 80px;
  border-radius: 25px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  right: -390px;
  top: 1px;
}

.dropdown a {
  color: black;
  padding: 0 5px;
  text-decoration: none;
  display: block;
}

.dropdown a:hover {
  border-radius: 25px;
  background-color: #f1f1f1;
}

.avatar-container:hover .dropdown {
  border-radius: 25px;
  display: block;
}
</style>
