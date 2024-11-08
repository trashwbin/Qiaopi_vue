<template>
  <div class="container">
    <nav>
      <div class="banner">
        <router-link to="/introduce"><img src="../../assets/imgss/logo.webp" alt="侨缘信使" class="logo"></router-link>
        <router-link ref="slider1" to="/introduce" class="slider" :class="{ active: isActive('/introduce') }"
          @click.native="navigateAndSetActive('/introduce')">首页</router-link>
        <router-link ref="slider2" to="/letter" class="slider" :class="{ active: isActive('/letter') }"
          @click.native="navigateAndSetActive('/letter')">信海归舟</router-link>
        <router-link ref="slider3" to="/game" class="slider" :class="{ active: isActive('/game') }"
          @click.native="navigateAndSetActive('/game')">侨趣乐园</router-link>
        <router-link ref="slider4" to="/shop" class="slider" :class="{ active: isActive('/shop') }"
          @click.native="navigateAndSetActive('/shop')">侨礼批坊</router-link>
        <router-link ref="slider5" to="/marketing" class="slider" :class="{ active: isActive('/marketing') }"
          @click.native="navigateAndSetActive('/marketing')">文创商店</router-link>
        <div class="animation" :style="animationStyle"></div>
        <div class="money" v-if="isLoggedIn">
          <span class="pig" v-if="isLoggedIn">

          </span>
        </div>
        <div v-if="isLoggedIn" class="avatar-container" @mouseenter="onHover(true)" @mouseleave="onHover(false)">
          <!-- <el-dropdown style="height: 40px;" @command="handleCommand" placement="bottom">
            <el-avatar :src="userAvatar" shape="square" fit="fill"></el-avatar>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="profile">个人中心</el-dropdown-item>
              <el-dropdown-item command="logout">切换账号</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->
          <a href="/profile" :class="{ 'hover': isHovered }" class="avatar-img"
            :style="{ backgroundImage: `url(${userAvatar})` }"></a>
          <div class="avatar-shadow" :class="{ 'hover': isHovered }" :style="{ backgroundImage: `url(${userAvatar})` }">
          </div>
          <transition name="el-zoom-in-top">
            <div class="bew-popover" v-show="isHovered">
              <div class="text-xl font-medium flex items-center gap-2">
                <span>{{ userName }}</span>
              </div>
              <div class="text-xs text-\$bew-text-2 mt-1 mb-2" style="text-align: left;">
                <img
                  src="data:image/webp;base64,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"
                  alt="猪仔钱" style="vertical-align: middle; height: 12px; width: 16px;" title="猪仔钱">
                <span class="group mr-4" style="vertical-align: middle;">猪仔钱: {{ money }}</span>
              </div>

              <div class="grid cols-3 gap-2 mb-2">
                <a href="/receive" :title="myStatistics.receiveLetterCount" class="channel-info-item">
                  <div class="num">{{ myStatistics.receiveLetterCount ? myStatistics.receiveLetterCount : '—' }}</div>
                  <div>我的收信</div>
                </a>
                <a href="/profile?command=friends" :title="myStatistics.friendCount" class="channel-info-item">
                  <div class="num">{{ myStatistics.friendCount ? myStatistics.friendCount : '—' }}</div>
                  <div>我的好友</div>
                </a>
                <a href="/profile" :title="myStatistics.collectionCount" class="channel-info-item">
                  <div class="num">{{ myStatistics.collectionCount ? myStatistics.collectionCount : '—' }}</div>
                  <div>我的收藏</div>
                </a>
              </div>
              <div class="tab-container">
                <div class="link" @mouseover="showSignPopover = true" @mouseleave="showSignPopover = false">
                  <div class="link-content">
                    <div class="icon icon-task"></div>
                    <span>每日任务</span>
                  </div>
                  <transition name="el-fade-in-linear">
                    <div v-show="showSignPopover" class="v-popover" @mouseenter="showSignPopover = true">
                      <div class="signDialog">
                        <div class="signTitle"><svg t="1730991046359"
                            style="width:1.2em;height:1.2em; margin-right: 5px; margin-top: -5px; vertical-align: middle;"
                            viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10885"
                            width="200" height="200">
                            <path
                              d="M835.9 186.4H732c0.3-1.7 0.5-3.4 0.5-5.2v-56.5c0-18.1-14.4-32.8-31.9-32.8-17.6 0-31.9 14.8-31.9 32.8v56.5c0 1.8 0.2 3.5 0.5 5.2H353.5c0.3-1.7 0.5-3.4 0.5-5.2v-56.5c0-18.1-14.4-32.8-31.9-32.8-17.6 0-31.9 14.8-31.9 32.8v56.5c0 1.8 0.2 3.5 0.5 5.2H186.8c-67.8 0-122.9 56.7-122.9 126.3v493.4c0 69.7 55.2 126.3 122.9 126.3h649.1c67.8 0 122.9-56.7 122.9-126.3V312.8c0-69.7-55.1-126.4-122.9-126.4zM904 806.2c0 38.6-30.5 70-68.1 70H186.8c-37.5 0-68.1-31.4-68.1-70V422.5H904v383.7z m0-438.7H118.7v-54.7c0-38.6 30.5-70 68.1-70h649.1c37.5 0 68.1 31.4 68.1 70v54.7z"
                              fill="#6B400D" p-id="10886"></path>
                            <path
                              d="M199.8 716.4c13.7 0 24.8-11.4 24.8-25.5s-11.1-25.5-24.8-25.5c-13.7 0-24.8 11.4-24.8 25.5s11.1 25.5 24.8 25.5zM218 753.5v-0.1-0.8h-0.2c-0.5-11.6-9.1-20.9-19.8-20.9-10.7 0-19.3 9.3-19.8 20.9h-0.1c0.4 58.7 17.7 76.8 72.4 76.8h204.8c11 0 20-9.8 20-21.8s-8.9-21.8-20-21.8H250.6c-32.3 0-32.6 0.7-32.6-32.3zM178.1 752.5v-2.2 2.2zM468.8 713.4c4.4 4.5 10.2 7 16.4 7 4.1 0 8.1-1.1 11.4-3.1 2.1-1.1 4-2.6 5.7-4.3l184.1-189.3c9-9.3 9-24.5 0-33.8-4.4-4.5-10.2-7-16.4-7s-12 2.5-16.4 7l-168.3 173-83.4-85.8c-4.4-4.5-10.2-7-16.4-7-6.2 0-12 2.5-16.4 7-9 9.3-9 24.5 0 33.8l99.7 102.5z"
                              fill="#6B400D" p-id="10887"></path>
                            <path
                              d="M835.9 242.8H186.8c-37.5 0-68.1 31.4-68.1 70v54.7H904v-54.7c0-38.6-30.6-70-68.1-70z"
                              fill="#FFD524" p-id="10888"></path>
                          </svg>本周已累签 <span style="color:#ff6200">{{ signedDays }}</span> 天
                          <el-button @click="sign" size="small" :disabled="isSignToday"
                            :style="{ float: 'right', backgroundColor: isSignToday ? '#C7C7C7' : '#ff6200', color: 'aliceblue' }"
                            round>
                            {{ isSignToday ? '已签到' : '立即签到' }}
                          </el-button>
                        </div>
                        <div class="signContent">
                          <div class="signAwardContent">
                            <div class="signAwardContentItem" v-for="item in signList" :key="item.id">
                              <div class="signAwardInfo">
                                第 {{ item.id }} 天
                              </div>
                              <div class="signAwardPreviewLink"><img :src="item.previewLink" :alt="item.awardName"
                                  :title="item.awardDesc"></div>
                              <div class="signAwardInfo">
                                {{ item.awardName }}x{{ item.awardNum }}
                              </div>
                              <div v-if="item.received" class="overlay">
                                <svg t="1730990885102" style="width:40px;height:40px" viewBox="0 0 1024 1024"
                                  version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7933" width="200" height="200">
                                  <path
                                    d="M682.976589 129.682722a418.766911 418.766911 0 1 0 248.316088 382.727577v-42.790365a46.546577 46.546577 0 0 1 93.093153 0v42.841124a511.910824 511.910824 0 0 1-689.214196 479.830741A511.809305 511.809305 0 1 1 720.843269 44.609589a46.546577 46.546577 0 0 1-37.86668 85.073133z m327.754902-22.384995a46.546577 46.546577 0 0 1 0 65.784475l-465.262728 465.770324a46.546577 46.546577 0 0 1-65.835234 0l-139.588971-139.58897a46.546577 46.546577 0 1 1 65.835235-65.784475l106.645973 106.645973 432.42125-432.827327a46.546577 46.546577 0 0 1 65.784475 0z"
                                    p-id="7934" fill="#ffffff"></path>
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="v-popper__arrow"></div>
                    </div>
                  </transition>
                </div>
                <div class="link" @mouseover="showSignPopover = true" @mouseleave="showSignPopover = false">
                  <div class="link-content">
                    <div class="icon icon-sign"></div>
                    <span>本周签到</span>
                  </div>
                  <transition name="el-fade-in-linear">
                    <div v-show="showSignPopover" class="v-popover" @mouseenter="showSignPopover = true">
                      <div class="signDialog">
                        <div class="signTitle"><svg t="1730991046359"
                            style="width:1.2em;height:1.2em; margin-right: 5px; margin-top: -5px; vertical-align: middle;"
                            viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10885"
                            width="200" height="200">
                            <path
                              d="M835.9 186.4H732c0.3-1.7 0.5-3.4 0.5-5.2v-56.5c0-18.1-14.4-32.8-31.9-32.8-17.6 0-31.9 14.8-31.9 32.8v56.5c0 1.8 0.2 3.5 0.5 5.2H353.5c0.3-1.7 0.5-3.4 0.5-5.2v-56.5c0-18.1-14.4-32.8-31.9-32.8-17.6 0-31.9 14.8-31.9 32.8v56.5c0 1.8 0.2 3.5 0.5 5.2H186.8c-67.8 0-122.9 56.7-122.9 126.3v493.4c0 69.7 55.2 126.3 122.9 126.3h649.1c67.8 0 122.9-56.7 122.9-126.3V312.8c0-69.7-55.1-126.4-122.9-126.4zM904 806.2c0 38.6-30.5 70-68.1 70H186.8c-37.5 0-68.1-31.4-68.1-70V422.5H904v383.7z m0-438.7H118.7v-54.7c0-38.6 30.5-70 68.1-70h649.1c37.5 0 68.1 31.4 68.1 70v54.7z"
                              fill="#6B400D" p-id="10886"></path>
                            <path
                              d="M199.8 716.4c13.7 0 24.8-11.4 24.8-25.5s-11.1-25.5-24.8-25.5c-13.7 0-24.8 11.4-24.8 25.5s11.1 25.5 24.8 25.5zM218 753.5v-0.1-0.8h-0.2c-0.5-11.6-9.1-20.9-19.8-20.9-10.7 0-19.3 9.3-19.8 20.9h-0.1c0.4 58.7 17.7 76.8 72.4 76.8h204.8c11 0 20-9.8 20-21.8s-8.9-21.8-20-21.8H250.6c-32.3 0-32.6 0.7-32.6-32.3zM178.1 752.5v-2.2 2.2zM468.8 713.4c4.4 4.5 10.2 7 16.4 7 4.1 0 8.1-1.1 11.4-3.1 2.1-1.1 4-2.6 5.7-4.3l184.1-189.3c9-9.3 9-24.5 0-33.8-4.4-4.5-10.2-7-16.4-7s-12 2.5-16.4 7l-168.3 173-83.4-85.8c-4.4-4.5-10.2-7-16.4-7-6.2 0-12 2.5-16.4 7-9 9.3-9 24.5 0 33.8l99.7 102.5z"
                              fill="#6B400D" p-id="10887"></path>
                            <path
                              d="M835.9 242.8H186.8c-37.5 0-68.1 31.4-68.1 70v54.7H904v-54.7c0-38.6-30.6-70-68.1-70z"
                              fill="#FFD524" p-id="10888"></path>
                          </svg>本周已累签 <span style="color:#ff6200">{{ signedDays }}</span> 天
                          <el-button @click="sign" size="small" :disabled="isSignToday"
                            :style="{ float: 'right', backgroundColor: isSignToday ? '#C7C7C7' : '#ff6200', color: 'aliceblue' }"
                            round>
                            {{ isSignToday ? '已签到' : '立即签到' }}
                          </el-button>
                        </div>
                        <div class="signContent">
                          <div class="signAwardContent">
                            <div class="signAwardContentItem" v-for="item in signList" :key="item.id">
                              <div class="signAwardInfo">
                                第 {{ item.id }} 天
                              </div>
                              <div class="signAwardPreviewLink"><img :src="item.previewLink" :alt="item.awardName"
                                  :title="item.awardDesc"></div>
                              <div class="signAwardInfo">
                                {{ item.awardName }}x{{ item.awardNum }}
                              </div>
                              <div v-if="item.received" class="overlay">
                                <svg t="1730990885102" style="width:40px;height:40px" viewBox="0 0 1024 1024"
                                  version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7933" width="200" height="200">
                                  <path
                                    d="M682.976589 129.682722a418.766911 418.766911 0 1 0 248.316088 382.727577v-42.790365a46.546577 46.546577 0 0 1 93.093153 0v42.841124a511.910824 511.910824 0 0 1-689.214196 479.830741A511.809305 511.809305 0 1 1 720.843269 44.609589a46.546577 46.546577 0 0 1-37.86668 85.073133z m327.754902-22.384995a46.546577 46.546577 0 0 1 0 65.784475l-465.262728 465.770324a46.546577 46.546577 0 0 1-65.835234 0l-139.588971-139.58897a46.546577 46.546577 0 1 1 65.835235-65.784475l106.645973 106.645973 432.42125-432.827327a46.546577 46.546577 0 0 1 65.784475 0z"
                                    p-id="7934" fill="#ffffff"></path>
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="v-popper__arrow"></div>
                    </div>
                  </transition>
                </div>
              </div>
              <div class="tab-container">
                <div class="link" @click="handleCommand('profile')">
                  <div class="link-content">
                    <div class="icon icon-profile"></div>
                    <span>个人中心</span>
                  </div>
                  <div class="arrow"></div>
                </div>
                <div class="link" @click="handleCommand('profile', 'address')">
                  <div class="link-content">
                    <div class="icon icon-address"></div>
                    <span>管理地址</span>
                  </div>
                  <div class="arrow"></div>
                </div>
                <div class="link" @click="handleCommand('profile', 'cangku')">
                  <div class="link-content">
                    <div class="icon icon-cangku"></div>
                    <span>我的仓库</span>
                  </div>
                  <div class="arrow"></div>
                </div>
                <div class="link" @click="handleCommand('profile', 'password')">
                  <div class="link-content">
                    <div class="icon icon-password"></div>
                    <span>账号设置</span>
                  </div>
                  <div class="arrow"></div>
                </div>
                <div class="link" style="color: hsl(358 75% 59%);" @click="handleCommand('logout')">
                  <div class="link-content">
                    <div class="icon icon-logout"></div>
                    退出登录
                  </div>
                </div>
              </div>
            </div>
          </transition>

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
import { getUserMoney, sign, getSignList, getMyStatistics } from '@/api/user'
import useUserStore from '@/store/modules/user'

export default {
  name: 'QiaopiIndex',
  data() {
    return {
      currentRoute: this.$route.path,
      money: 0,
      showMenu: false,
      activeIndex: 0,
      isHovered: false,
      showSignPopover: false,
      signList: [],
      isSignToday: false,
      signedDays: 0,
      myStatistics: {},
      myStatisticsFetched: false,
      signListFetched: false,
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
          ? '#E6D4B0'
          : this.activeIndex === 1
            ? '#D3BF9E'
            : this.activeIndex === 2 ? '#C7A981' : this.activeIndex === 3 ? '#CFAA7F' : this.activeIndex === 4 ? '#B8966A' : 'transparent'
      }
    }
  },
  methods: {
    getMyStatistics() {
      getMyStatistics().then(res => {
        this.myStatistics = res.data
      })
    },
    hideSignPopover() {
      setTimeout(() => {
        this.showSignPopover = false
      }, 300)
    },
    sign() {
      sign().then(() => {
        this.$notify({
          title: '签到成功',
          message: '连续签到更能获得神秘好礼哦!🥳',
          type: 'success',
          offset: 100,
          position: 'top-left'
        })
        this.getSignList()
        this.getUserMoney()
        this.getMyStatistics()
      })
    },
    getSignList() {
      getSignList().then(res => {
        this.signList = res.data.userSignAwards
        this.signedDays = res.data.signedDays
        this.isSignToday = res.data.isSignToday
      })
    },
    onHover(isHovered) {
      this.isHovered = isHovered
      if (isHovered && !this.signListFetched) {
        this.getSignList()
        this.signListFetched = true
      }
      if (isHovered && !this.myStatisticsFetched) {
        this.getMyStatistics()
        this.myStatisticsFetched = true
      }
    },
    updatePositions() {
      this.positions = [
        this.$refs.slider1?.$el?.offsetLeft || 0,
        this.$refs.slider2?.$el?.offsetLeft || 0,
        this.$refs.slider3?.$el?.offsetLeft || 0,
        this.$refs.slider4?.$el?.offsetLeft || 0,
        this.$refs.slider5?.$el?.offsetLeft || 0
      ]
    },
    handleCommand(router, command = '') {
      console.log(router, command)
      if (router === 'logout') {
        const userStore = useUserStore()
        userStore.logOut()
        this.$router.push('/login')
      } else if (router === 'profile') {
        console.log(this.currentRoute)
        // this.$router.go(0) // 刷新页面
        this.$router.push({
          path: '/profile',
          query: { command }
        })
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
        this.activeIndex = ['/', '/introduce', '/letter', '/game', '/shop', '/marketing'].indexOf(path)
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
        '/marketing': 4,
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
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updatePositions)
  },
  mounted() {
    this.$nextTick(() => {
      this.updatePositions()
    })
    window.addEventListener('resize', this.updatePositions)
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
  /* background-size: 100% 100%; */
  background-position: center center;
}

.banner {
  position: relative;
  width: 100%;
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
  width: 200px;
  height: 30px;
  line-height: 30px;
}

.money img {
  width: 30px;
  height: 100%;
}

.pig {
  position: absolute;
  top: 0;
  right: 7%;
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
  right: 150px;
  display: inline-block;
  z-index: 11;
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

* {
  --bew-base-font-size: 14.8px;
  --bew-radius: 12px;
  --bew-radius-half: calc(var(--bew-radius) / 2);
  --bew-text-auto: white;
  --bew-text-1: hsl(217 19% 10%);
  --bew-text-2: hsl(215 19% 24% / 80%);
  --bew-text-3: hsl(215 19% 28% / 60%);
  --bew-text-4: hsl(215 19% 36% / 40%);
  --bew-bg: hsl(0 0% 100%);
  --bew-homepage-bg: hsl(240 31% 96%);
  --bew-homepage-bg-mask-opacity: 0;
  --bew-content-opacity: 1;
  --bew-filter-glass-1: none;
  --bew-filter-glass-2: none;
  --bew-shadow-edge-glow-1: 0 0 0 transparent;
  --bew-shadow-edge-glow-2: 0 0 0 transparent;
  --bew-fill-alt: var(--bew-content-solid);
  --bew-shadow-1: 0 4px 6px -1px rgb(0 0 0 / .08), 0 2px 4px -2px rgb(0 0 0 / .04);
  --bew-shadow-2: 0 10px 15px -3px rgb(0 0 0 / .1), 0 4px 6px -4px rgb(0 0 0 / .06);
  --bew-shadow-3: 0 20px 25px -5px rgb(0 0 0 / .12), 0 8px 10px -6px rgb(0 0 0 / .08);
  --bew-shadow-4: 0 34px 50px -20px rgb(0 0 0 / .14), 0 32px 45px -12px rgb(0 0 0 / .1), 0 30px 40px -8px rgb(0 0 0 / .12);
  --bew-shadow-edge-glow-1: inset 1px 1px 1px -.5px rgba(255, 255, 255, .2), inset -1px -1px 1px -.5px rgba(255, 255, 255, .12), inset 0 0 4px rgba(255, 255, 255, .4);
  --bew-shadow-edge-glow-2: inset 1px 1px 1px -.5px rgba(255, 255, 255, .2), inset -1px -1px 1px -.5px rgba(255, 255, 255, .12), inset 0 0 8px rgba(255, 255, 255, .42);
  --bew-homepage-bg-mask: hsl(240 31% 96% / var(--bew-homepage-bg-mask-opacity));
  --bew-content-opacity: .68;
  --bew-content: hsl(0 0% 100% / var(--bew-content-opacity));
  --bew-content-hover: hsl(0 0% 85% / var(--bew-content-opacity));
  --bew-content-alt: hsl(240 31% 95% / var(--bew-content-opacity));
  --bew-content-alt-hover: hsl(240 31% 80% / var(--bew-content-opacity));
  --bew-content-solid: hsl(0 0% 100%);
  --bew-content-solid-hover: hsl(0 0% 85%);
  --bew-content-alt-solid: hsl(240 31% 95%);
  --bew-content-alt-solid-hover: hsl(240 31% 85%);
  --bew-fill-1: rgb(131 131 145 / 13%);
  --bew-fill-2: rgb(131 131 145 / 23%);
  --bew-fill-3: rgb(131 131 145 / 33%);
  --bew-fill-4: rgb(131 131 145 / 43%);
}

*,
:before,
:after {
  --un-rotate: 0;
  --un-rotate-x: 0;
  --un-rotate-y: 0;
  --un-rotate-z: 0;
  --un-scale-x: 1;
  --un-scale-y: 1;
  --un-scale-z: 1;
  --un-skew-x: 0;
  --un-skew-y: 0;
  --un-translate-x: 0;
  --un-translate-y: 0;
  --un-translate-z: 0;
  --un-pan-x: ;
  --un-pan-y: ;
  --un-pinch-zoom: ;
  --un-scroll-snap-strictness: proximity;
  --un-ordinal: ;
  --un-slashed-zero: ;
  --un-numeric-figure: ;
  --un-numeric-spacing: ;
  --un-numeric-fraction: ;
  --un-border-spacing-x: 0;
  --un-border-spacing-y: 0;
  --un-ring-offset-shadow: 0 0 rgb(0 0 0 / 0);
  --un-ring-shadow: 0 0 rgb(0 0 0 / 0);
  --un-shadow-inset: ;
  --un-shadow: 0 0 rgb(0 0 0 / 0);
  --un-ring-inset: ;
  --un-ring-offset-width: 0px;
  --un-ring-offset-color: #fff;
  --un-ring-width: 0px;
  --un-ring-color: rgb(147 197 253 / .5);
  --un-blur: ;
  --un-brightness: ;
  --un-contrast: ;
  --un-drop-shadow: ;
  --un-grayscale: ;
  --un-hue-rotate: ;
  --un-invert: ;
  --un-saturate: ;
  --un-sepia: ;
  --un-backdrop-blur: ;
  --un-backdrop-brightness: ;
  --un-backdrop-contrast: ;
  --un-backdrop-grayscale: ;
  --un-backdrop-hue-rotate: ;
  --un-backdrop-invert: ;
  --un-backdrop-opacity: ;
  --un-backdrop-saturate: ;
  --un-backdrop-sepia: ;
}

a {
  color: inherit;
  text-decoration: inherit;
}

.avatar-container:hover:after,
.avatar-container.hover:after {
  position: absolute;
  right: 0;
  top: 20px;
  width: 110px;
  height: 120px;
  content: "";
}

.avatar-img,
.avatar-shadow {
  display: block;
  margin-left: 5px;
  width: 34px;
  height: 34px;
  border-radius: 5px;
  background-size: cover;
  background-position: center;
  transition-duration: .3s;
  position: relative;
  z-index: 11;
}

.avatar-img.hover,
.avatar-shadow.hover {
  --un-translate-y: 60px;
  --un-translate-x: -36px;
  --un-scale-x: 2.3;
  --un-scale-y: 2.3;
  transform: translate(var(--un-translate-x)) translateY(var(--un-translate-y)) translateZ(var(--un-translate-z)) rotate(var(--un-rotate)) rotateX(var(--un-rotate-x)) rotateY(var(--un-rotate-y)) rotate(var(--un-rotate-z)) skew(var(--un-skew-x)) skewY(var(--un-skew-y)) scaleX(var(--un-scale-x)) scaleY(var(--un-scale-y)) scaleZ(var(--un-scale-z));
}

.avatar-shadow.hover {
  opacity: .6;
}

.avatar-shadow {
  pointer-events: none;
  position: absolute;
  top: 0;
  z-index: 0;
  opacity: 0;
  --un-blur: blur(4px);
  filter: var(--un-blur);
}

.bew-popover {
  position: absolute;
  top: 60px;
  left: 50%;
  --un-translate-x: -50%;
  transform: translate(var(--un-translate-x)) translateY(var(--un-translate-y)) translateZ(var(--un-translate-z)) rotate(var(--un-rotate)) rotateX(var(--un-rotate-x)) rotateY(var(--un-rotate-y)) rotate(var(--un-rotate-z)) skew(var(--un-skew-x)) skewY(var(--un-skew-y)) scaleX(var(--un-scale-x)) scaleY(var(--un-scale-y)) scaleZ(var(--un-scale-z));
  overflow: visible;
  padding: 14.8px;
  border-radius: 12px;
  width: 300px;
  box-sizing: border-box;
  z-index: 10;
  background-color: hsl(240 31% 95% / 1);
  border-color: rgb(131 131 145 / 18%);
  border-width: 1px;
  box-shadow: 0 0 rgb(0 0 0 / 0), 0 0 rgb(0 0 0 / 0), 0 20px 25px -5px rgb(0 0 0 / .12), 0 8px 10px -6px rgb(0 0 0 / .08), 0 0 0 transparent;
  right: 0 !important;
  left: auto !important;
  --un-translate-x: 0 !important;
  transform: translate(var(--un-translate-x)) translateY(var(--un-translate-y)) translateZ(var(--un-translate-z)) rotate(var(--un-rotate)) rotateX(var(--un-rotate-x)) rotateY(var(--un-rotate-y)) rotate(var(--un-rotate-z)) skew(var(--un-skew-x)) skewY(var(--un-skew-y)) scaleX(var(--un-scale-x)) scaleY(var(--un-scale-y)) scaleZ(var(--un-scale-z)) !important;
  backdrop-filter: var(--bew-filter-glass-1);
}

.bewly-wrapper * {
  -moz-osx-font-smoothing: grayscale;
}

.text-xl {
  font-size: calc(var(--bew-base-font-size)* 1.45);
  line-height: calc(var(--bew-base-font-size)* 1.75);
}

.font-medium {
  font-weight: 500;
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.gap-2 {
  gap: 7.4px;
}

.text-xs {
  font-size: 11px;
  line-height: 14.8px;
}

.text-\$bew-text-2 {
  color: var(--bew-text-2);
}

.mt-1 {
  margin-top: calc(var(--bew-base-font-size) * 0.25);
}

.mb-2 {
  margin-bottom: calc(var(--bew-base-font-size) * 0.5);
}

.mr-4 {
  margin-right: calc(var(--bew-base-font-size) * 1);
}

.bewly-wrapper * {
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.block {
  display: block;
}

.w-full {
  width: 100%;
}

.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.justify-center {
  justify-content: center;
}

.items-start {
  align-items: flex-start;
}

.gap-2,
[flex~=gap-2],
[gap-2=""],
[grid~=gap-2] {
  gap: calc(var(--bew-base-font-size) * 0.5);
}

.mb-2,
[m~=b-2],
[mb-2=""] {
  margin-bottom: calc(var(--bew-base-font-size) * 0.5);
}

.cols-3,
[grid~=cols-3] {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.grid,
[grid=""],
[grid~="~"] {
  display: grid;
}

.channel-info-item {
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: var(--bew-radius);
  padding: calc(var(--bew-base-font-size) * 0.5);
  font-size: calc(var(--bew-base-font-size) * 0.875);
  line-height: calc(var(--bew-base-font-size) * 1.25);
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.3s;
  background-color: var(--bew-fill-alt);
  --un-shadow: var(--bew-shadow-edge-glow-1), var(--bew-shadow-1);
  box-shadow: var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow);
}

.channel-info-item:hover {
  background-color: var(--bew-fill-2);
}

.channel-info-item .num {
  font-size: calc(var(--bew-base-font-size) * 1.25);
  line-height: calc(var(--bew-base-font-size) * 1.75);
  font-weight: 600;
  margin-bottom: 4px;
}

.channel-info-item>* {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.3s;
}

.tab-container {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  background-color: var(--bew-fill-alt);
  border-radius: var(--bew-radius);
  box-shadow: var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow);
  font-size: var(--bew-base-font-size);
}

.link {
  display: flex;
  cursor: pointer;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: var(--bew-radius);
  transition-duration: 0.3s;
  background-color: transparent;
  height: 1.35rem;
}

.link:hover {
  background-color: var(--bew-fill-2);
}

.link-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.icon {
  --un-icon: url(data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' display='inline-block' vertical-align='middle' width='1.2em' height='1.2em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' fill-rule='evenodd' d='M15.328 7.542H8.672c-3.374 0-5.062 0-6.01.987c-.948.987-.725 2.511-.278 5.56l.422 2.892c.35 2.391.525 3.587 1.422 4.303c.898.716 2.22.716 4.867.716h5.81c2.646 0 3.97 0 4.867-.716c.897-.716 1.072-1.912 1.422-4.303l.422-2.892c.447-3.049.67-4.573-.278-5.56c-.948-.987-2.636-.987-6.01-.987m-.747 8.252c.559-.346.559-1.242 0-1.588l-3.371-2.09c-.543-.337-1.21.101-1.21.794v4.18c0 .693.667 1.13 1.21.794z' clip-rule='evenodd'/%3E%3Cpath fill='currentColor' d='M8.51 2h6.98c.232 0 .41 0 .566.015c1.108.109 2.015.775 2.4 1.672H5.543c.384-.897 1.291-1.563 2.399-1.672C8.099 2 8.277 2 8.51 2' opacity='.4'/%3E%3Cpath fill='currentColor' d='M6.31 4.723c-1.39 0-2.53.84-2.911 1.953a2.587 2.587 0 0 0-.023.07c.398-.12.812-.199 1.232-.253c1.08-.138 2.446-.138 4.032-.138h6.892c1.586 0 2.951 0 4.032.138a7.69 7.69 0 0 1 1.232.253a2.453 2.453 0 0 0-.023-.07c-.38-1.114-1.521-1.953-2.912-1.953z' opacity='.7'/%3E%3C/svg%3E);
  -webkit-mask: var(--un-icon) no-repeat;
  mask: var(--un-icon) no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
  background-color: currentColor;
  color: inherit;
  display: inline-block;
  vertical-align: middle;
  width: 1.2em;
  height: 1.2em;
}

.icon-logout {
  --un-icon: url(data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' display='inline-block' vertical-align='middle' width='1.2em' height='1.2em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M16 2h-1c-2.829 0-4.242 0-5.121.879C9 3.758 9 5.172 9 8v8c0 2.829 0 4.243.879 5.122c.878.878 2.292.878 5.119.878H16c2.828 0 4.242 0 5.121-.879C22 20.243 22 18.828 22 16V8c0-2.828 0-4.243-.879-5.121C20.242 2 18.828 2 16 2' opacity='.5'/%3E%3Cpath fill='currentColor' fill-rule='evenodd' d='M15.75 12a.75.75 0 0 0-.75-.75H4.027l1.961-1.68a.75.75 0 1 0-.976-1.14l-3.5 3a.75.75 0 0 0 0 1.14l3.5 3a.75.75 0 1 0 .976-1.14l-1.96-1.68H15a.75.75 0 0 0 .75-.75' clip-rule='evenodd'/%3E%3C/svg%3E);
}

.icon-cangku {
  --un-icon: url(data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' display='inline-block' vertical-align='middle' width='1.2em' height='1.2em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' fill-rule='evenodd' d='m10.007 3.772l-6 5.333A3 3 0 0 0 3 11.347v9.903H2a.75.75 0 1 0 0 1.5h20a.75.75 0 0 0 0-1.5h-1v-9.903a3 3 0 0 0-1.007-2.242l-6-5.333a3 3 0 0 0-3.986 0M10 8.25a.75.75 0 0 0 0 1.5h4a.75.75 0 0 0 0-1.5zm4.052 3c.899 0 1.648 0 2.242.08c.628.084 1.195.27 1.65.726c.456.455.642 1.022.726 1.65c.08.594.08 1.344.08 2.242v5.302H5.25v-5.302c0-.898 0-1.648.08-2.242c.084-.628.27-1.195.725-1.65c.456-.456 1.023-.642 1.65-.726c.595-.08 1.345-.08 2.243-.08z' clip-rule='evenodd'/%3E%3Cpath fill='currentColor' d='M14.052 11.25H9.948c-.898 0-1.648 0-2.242.08c-.628.084-1.195.27-1.65.726c-.456.455-.642 1.022-.726 1.65c-.08.594-.08 1.344-.08 2.242v5.302h13.5v-5.302c0-.898 0-1.648-.08-2.242c-.084-.628-.27-1.195-.726-1.65c-.455-.456-1.022-.642-1.65-.726c-.594-.08-1.344-.08-2.242-.08' opacity='.5'/%3E%3Cpath fill='currentColor' d='M9 14.75a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5zm0 3a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5z'/%3E%3C/svg%3E);
}

.icon-sign {
  --un-icon: url(data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' display='inline-block' vertical-align='middle' width='1.2em' height='1.2em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M3 10c0-3.771 0-5.657 1.172-6.828C5.343 2 7.229 2 11 2h2c3.771 0 5.657 0 6.828 1.172C21 4.343 21 6.229 21 10v4c0 3.771 0 5.657-1.172 6.828C18.657 22 16.771 22 13 22h-2c-3.771 0-5.657 0-6.828-1.172C3 19.657 3 17.771 3 14z' opacity='.5'/%3E%3Cpath fill='currentColor' d='M16.519 16.501c.175-.136.334-.295.651-.612l3.957-3.958c.096-.095.052-.26-.075-.305a4.332 4.332 0 0 1-1.644-1.034a4.332 4.332 0 0 1-1.034-1.644c-.045-.127-.21-.171-.305-.075L14.11 12.83c-.317.317-.476.476-.612.651c-.161.207-.3.43-.412.666c-.095.2-.166.414-.308.84l-.184.55l-.292.875l-.273.82a.584.584 0 0 0 .738.738l.82-.273l.875-.292l.55-.184c.426-.142.64-.212.84-.308c.236-.113.46-.25.666-.412m5.849-5.809a2.163 2.163 0 1 0-3.06-3.059l-.126.128a.524.524 0 0 0-.148.465c.02.107.055.265.12.452c.13.375.376.867.839 1.33a3.5 3.5 0 0 0 1.33.839c.188.065.345.1.452.12a.525.525 0 0 0 .465-.148z'/%3E%3Cpath fill='currentColor' fill-rule='evenodd' d='M7.25 9A.75.75 0 0 1 8 8.25h6.5a.75.75 0 0 1 0 1.5H8A.75.75 0 0 1 7.25 9m0 4a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5H8a.75.75 0 0 1-.75-.75m0 4a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H8a.75.75 0 0 1-.75-.75' clip-rule='evenodd'/%3E%3C/svg%3E);
}

.icon-profile {
  --un-icon: url(data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' display='inline-block' vertical-align='middle' width='1.2em' height='1.2em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10' opacity='.5'/%3E%3Cpath fill='currentColor' d='M16.807 19.011A8.46 8.46 0 0 1 12 20.5a8.46 8.46 0 0 1-4.807-1.489c-.604-.415-.862-1.205-.51-1.848C7.41 15.83 8.91 15 12 15c3.09 0 4.59.83 5.318 2.163c.35.643.093 1.433-.511 1.848M12 12a3 3 0 1 0 0-6a3 3 0 0 0 0 6'/%3E%3C/svg%3E);
}

.icon-task {
  --un-icon: url(data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' display='inline-block' vertical-align='middle' width='1.2em' height='1.2em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M21 15.998v-6c0-2.828 0-4.242-.879-5.121C19.353 4.109 18.175 4.012 16 4H8c-2.175.012-3.353.109-4.121.877C3 5.756 3 7.17 3 9.998v6c0 2.829 0 4.243.879 5.122c.878.878 2.293.878 5.121.878h6c2.828 0 4.243 0 5.121-.878c.879-.88.879-2.293.879-5.122' opacity='.5'/%3E%3Cpath fill='currentColor' d='M8 3.5A1.5 1.5 0 0 1 9.5 2h5A1.5 1.5 0 0 1 16 3.5v1A1.5 1.5 0 0 1 14.5 6h-5A1.5 1.5 0 0 1 8 4.5z'/%3E%3Cpath fill='currentColor' fill-rule='evenodd' d='M6.25 10.5A.75.75 0 0 1 7 9.75h.5a.75.75 0 0 1 0 1.5H7a.75.75 0 0 1-.75-.75m3.5 0a.75.75 0 0 1 .75-.75H17a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75M6.25 14a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5H7a.75.75 0 0 1-.75-.75m3.5 0a.75.75 0 0 1 .75-.75H17a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75m-3.5 3.5a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5H7a.75.75 0 0 1-.75-.75m3.5 0a.75.75 0 0 1 .75-.75H17a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75' clip-rule='evenodd'/%3E%3C/svg%3E);
}

.icon-address {
  --un-icon: url(data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' display='inline-block' vertical-align='middle' width='1.2em' height='1.2em' xmlns='http://www.w3.org/2000/svg' %3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z'/%3E%3Cpath fill='currentColor' d='M13.228 2.688a2 2 0 0 0-2.456 0l-8.384 6.52C1.636 9.795 2.05 11 3.003 11h1.092l.82 8.199A2 2 0 0 0 6.905 21h10.19a2 2 0 0 0 1.99-1.801l.82-8.199h1.092c.952 0 1.368-1.205.615-1.791l-8.384-6.52ZM12 16a3 3 0 1 0 0-6a3 3 0 0 0 0 6'/%3E%3C/g%3E%3C/svg%3E);
}

.icon-password {
  --un-icon: url(data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' display='inline-block' vertical-align='middle' width='1.2em' height='1.2em' xmlns='http://www.w3.org/2000/svg' %3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z'/%3E%3Cpath fill='currentColor' d='M14.035 2.809c.37-.266.89-.39 1.401-.203a9.99 9.99 0 0 1 2.982 1.725c.417.35.57.861.524 1.313c-.075.753.057 1.48.42 2.106c.32.557.802.997 1.39 1.307l.225.11c.414.187.782.576.875 1.113a10.06 10.06 0 0 1 0 3.44c-.083.484-.39.847-.753 1.051l-.122.063c-.69.31-1.254.79-1.616 1.416c-.362.627-.494 1.353-.419 2.106c.045.452-.107.964-.524 1.313a9.99 9.99 0 0 1-2.982 1.725a1.51 1.51 0 0 1-1.4-.203C13.42 20.75 12.723 20.5 12 20.5s-1.42.249-2.035.691a1.51 1.51 0 0 1-1.401.203a9.989 9.989 0 0 1-2.982-1.725a1.511 1.511 0 0 1-.524-1.313c.075-.753-.058-1.48-.42-2.106a3.414 3.414 0 0 0-1.39-1.307l-.225-.11a1.511 1.511 0 0 1-.875-1.113a10.057 10.057 0 0 1 0-3.44c.083-.484.39-.847.753-1.051l.122-.062c.69-.311 1.254-.79 1.616-1.417c.361-.626.494-1.353.419-2.106a1.511 1.511 0 0 1 .524-1.313a9.99 9.99 0 0 1 2.982-1.725a1.511 1.511 0 0 1 1.4.203c.615.442 1.312.691 2.036.691s1.42-.249 2.035-.691m.957 1.769c-.866.57-1.887.922-2.992.922s-2.126-.353-2.992-.922A7.99 7.99 0 0 0 7.068 5.7c.06 1.033-.145 2.093-.697 3.05c-.553.956-1.368 1.663-2.293 2.128a8.078 8.078 0 0 0 0 2.242c.925.465 1.74 1.172 2.293 2.13c.552.955.757 2.015.697 3.048a7.99 7.99 0 0 0 1.94 1.123c.866-.57 1.887-.922 2.992-.922s2.126.353 2.992.922a7.993 7.993 0 0 0 1.94-1.122c-.06-1.034.145-2.094.697-3.05c.552-.957 1.368-1.664 2.293-2.13a8.066 8.066 0 0 0 0-2.24c-.925-.466-1.74-1.173-2.293-2.13c-.552-.956-.757-2.016-.697-3.05a7.99 7.99 0 0 0-1.94-1.122ZM12 8a4 4 0 1 1 0 8a4 4 0 0 1 0-8m0 2a2 2 0 1 0 0 4a2 2 0 0 0 0-4'/%3E%3C/g%3E%3C/svg%3E);
}

.arrow {
  --un-icon: url(data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' display='inline-block' vertical-align='middle' width='1.2em' height='1.2em' xmlns='http://www.w3.org/2000/svg' %3E%3Cg fill='none'%3E%3Cpath d='M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z'/%3E%3Cpath fill='currentColor' d='m14.707 5.636l5.657 5.657a1 1 0 0 1 0 1.414l-5.657 5.657a1 1 0 0 1-1.414-1.414l3.95-3.95H4a1 1 0 1 1 0-2h13.243l-3.95-3.95a1 1 0 1 1 1.414-1.414'/%3E%3C/g%3E%3C/svg%3E);
  -webkit-mask: var(--un-icon) no-repeat;
  mask: var(--un-icon) no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
  background-color: currentColor;
  color: inherit;
  display: inline-block;
  vertical-align: middle;
  width: 1.2em;
  height: 1.2em;
}

.logout-button {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: var(--bew-radius);
  transition-duration: 0.3s;
  cursor: pointer;
}

.logout-button:hover {
  background-color: var(--bew-fill-2);
}

.signAwardContent {
  align-self: flex-start;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  height: 100%
}

.signAwardContent .signAwardContentItem {
  background-color: #f3f6f8;
  border: 1px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  font-weight: 400;
  /* height: 80px; */
  margin-right: 12px;
  margin-top: 12px;
  padding: 12px 12px 9px;
  position: relative;
  width: 60px;
  --un-shadow: var(--bew-shadow-edge-glow-1), var(--bew-shadow-1);
  box-shadow: var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow);
  flex: 1;
}

.signAwardContent .signAwardContentItem:nth-of-type(4n) {
  margin-right: 0;
}

.signAwardContent .signAwardContentItem:last-child {
  margin-right: 0;
  width: 170px;
  flex: 2.5;
}

.signAwardContent .signAwardContentItem:hover {
  /* background-color: #fff; */
  border: 1px solid #ff6200;
  background-color: var(--bew-fill-2);
}

.signAwardContent .signAwardPreviewLink {
  color: #50607a;
  height: 65px;
  min-width: 65px;
  max-width: 150px;
  width: auto;
  line-height: 18px;
  margin: 0 auto;
}

.signAwardContent .signAwardPreviewLink img {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  border-radius: 8px;
}

.signAwardContent .signAwardInfo {
  flex-direction: row;
  line-height: 12px;
  margin-bottom: 8px;
  text-align: center;
}

.signDialog {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative
}

.signTitle {
  color: #11192d;
  font-family: PingFangSC-Semibold;
  font-size: 20px;
  font-weight: 600;
  line-height: 30px;
  /* margin-bottom: 12px; */
  margin-left: 4px;
  text-align: left;
  height: 30px;
}

.signContent {
  flex: 1;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center
}

.v-popover {
  position: absolute;
  transition: .3s;
  z-index: 11;
  padding-left: 10px;
  margin-left: 0px;
  background-color: var(--bew-fill-alt);
  transform: translate3d(0, -50%, 0);
  top: 41.5%;
  right: 97%;
  border-radius: var(--bew-radius);
  filter: drop-shadow(0 2px 12px rgba(0, 0, 0, .03));
  padding: 20px;
  width: 400px;
  height: 320px;
}

.v-popover .v-popper__arrow {
  border-width: 6px;
  filter: drop-shadow(0 2px 12px rgba(0, 0, 0, .03));
}

.v-popover .v-popper__arrow,
.v-popover .v-popper__arrow::after {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
}

.v-popper__arrow {
  top: 50%;
  right: -6px;
  margin-bottom: 3px;
  border-right-width: 0;
  border-left-color: #EBEEF5;
}

.v-popover .v-popper__arrow::after {
  right: -10px;
  bottom: -5px;
  margin-left: -6px;
  border-right-width: 0;
  border-left-color: #FFF;
}

.v-popover .v-popper__arrow::after {
  content: " ";
  border-width: 6px;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  /* 半透明背景 */
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  border-radius: 8px;
}
</style>
