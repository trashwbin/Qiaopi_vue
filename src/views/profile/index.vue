<template>
  <div class="container">
    <div class="banner">
      <h1 class="profile"><img src="../../assets/imgs/profile.png" alt=""></h1>
      <div class="data">
        <div class="pic"><img src="../../assets/default-avatar.png" alt=""></div>
        <div class="information">
        <div class="name">{{ user.nickname }}</div>
        <div class="userid">用户名：<span>{{ user.username }}</span></div>
        <div class="adress">个人地址: <span>{{ user.address }}</span></div>
        <div class="money">猪仔钱：<span>{{ money }}</span></div>
        <div class="sex">性别：<span>{{ user.sex }}</span></div>
        <div class="email">邮箱：<span>{{ user.email }}</span></div>
        <div class="friends-container">
<!-- 好友列表浮窗 -->
<div v-if="showFriendsModal" class="friends-modal">
  <div class="modal-content">
    <span class="close" @click="toggleFriendsModal">&times;</span>
    <h2>我的好友</h2>
    <div class="friends-container">
      <div class="friend" v-for="friend in friends" :key="friend.id">
        <div class="friendname">{{ friend.name }}</div>
        <div class="friendsex">{{ friend.sex }}</div>
        <div class="friendemail">{{ friend.email }}</div>
      </div>
    </div>
  </div>
</div>
</div>
        </div>
        <button @click="toggleFriendsModal" class="friends">查看我的好友</button>
        <button @click="showEditModal" class="showEdit">修改内容</button>
      </div>
      <div class="store">
        <!-- <h1>我的仓库</h1>
        <div v-for="item in repository.fonts" :key="item.id">
          <h2>{{ item.name }}</h2>
          <img :src="item.previewImage" alt="字体预览" />
        </div>
        <div v-for="item in repository.papers" :key="item.id">
          <h2>{{ item.name }}</h2>
          <img :src="item.previewImage" alt="信纸预览" />
        </div> -->
        <img src="../../assets/imgs/store.png" alt="仓库" class="bgd">
        <img src="../../assets/imgs/color.png" alt="墨水" class="ink" @click="showInkImage">
        <img src="../../assets/imgs/pen.png" alt="笔" class="pen" @click="showWordImage">
        <img src="../../assets/imgs/envelope.png" alt="信纸" class="envelope" @click="showEnvelopeImage" >
        <!-- 墨水展示台 -->
<div v-if="showInkImageModal" class="image-modal">
  <div class="colorbox">  <div
    class="box"
    v-for="color in inkColors"
    :key="color.id"
    :style="{ backgroundColor: color.hexCode }"
  ></div></div>
  <span class="close" @click="showInkImageModal = false">&times;</span>
  <img src="../../assets/imgs/mood.png" alt="墨水图片" class="modal-image" />
    </div>
    <!-- 字体展示台 -->
<div v-if="showWordModal" class="image-modal">
  <div class="penboxs">  <div class="penbox"
      v-for="font in wordFonts"
      :key="font.id"
    >
      {{ font.name }}
    </div></div>
  <span class="close" @click="showWordModal = false">&times;</span>
  <img src="../../assets/imgs/mood.png" alt="墨水图片" class="modal-image" />
    </div>
    <!-- 信纸展示台 -->
<div v-if="showEnvelopeModal" class="image-modal">
  <div class="penboxs">      <div class="envelopebox"
      v-for="paper in paperPreviews"
      :key="paper.id"
      :style="{ backgroundImage: 'url(' + paper.previewImage + ')' }"
    >
    </div></div>
  <span class="close" @click="showEnvelopeModal= false">&times;</span>
  <img src="../../assets/imgs/mood.png" alt="墨水图片" class="modal-image" />
    </div>
</div>
      <!-- 弹窗结构 -->
      <div v-if="editModalVisible" class="edit-modal">
        <div class="modal-content">
          <span class="close" @click="hideEditModal">&times;</span>
          <h2>修改个人信息</h2>
          <form @submit.prevent="updateUserInfo">
            <div class="form-group">
              <label for="nickname">昵称:</label>
              <input type="text" id="nickname" v-model="user.nickname" required>
            </div>
            <div class="form-group">
              <label for="username">用户名:</label>
              <input type="text" id="username" v-model="user.username" required>
            </div>
            <div class="form-group">
              <label for="sex">性别:</label>
              <select id="sex" v-model="user.sex">
                <option value="男">男</option>
                <option value="女">女</option>
              </select>
            </div>
            <div class="form-group">
              <label for="email">邮箱:</label>
              <input type="email" id="email" v-model="user.email" required>
            </div>
            <button type="submit" class="save">保存</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import useUserStore from '@/store/modules/user'

export default {
  name: 'UserProfile',
  data() {
    return {
      showFriendsModal: false,
      friends: [],
      wordFonts: [], // 存储字体信息
      inkColors: [], // 存储墨水颜色的 hexCode
      paperPreviews: [], // 存储信纸预览图信息
      showInkImageModal: false,
      showWordModal: false,
      showEnvelopeModal: false,
      user: {},
      money: '',
      repository: {
        fonts: [],
        papers: []
      },
      editModalVisible: false // 控制弹窗显示的状态
    }
  },
  async created() {
    try {
      const userStore = useUserStore()
      const token = userStore.token // 从 Pinia store 获取 token
      const repoResponse = await axios.get('/api/user/getUserRepository', {
        headers: {
          Authorization: token
        }
      })
      if (repoResponse.data.code === 200 && repoResponse.data.data) {
        this.repository = repoResponse.data.data
        this.inkColors = repoResponse.data.data.fontColors // 存储墨水颜色信息
        this.wordFonts = repoResponse.data.data.fonts // 存储字体信息
        this.paperPreviews = repoResponse.data.data.papers // 存储信纸预览图信息
      }
    } catch (error) {
      console.error('获取用户仓库错误:', error)
    }
    try {
      const userStore = useUserStore()
      const token = userStore.token // 从Pinia store获取token
      const userResponse = await this.getUserInfo(token)
      if (userResponse && userResponse.data.code === 200) {
        this.user = userResponse.data.data
      }

      const moneyResponse = await this.getUserMoney(token)
      if (moneyResponse && moneyResponse.data.code === 200) {
        this.money = moneyResponse.data.data.money
      }

      const repoResponse = await this.getUserRepository(token)
      if (repoResponse && repoResponse.data.code === 200) {
        this.repository = repoResponse.data.data
      }

      // 获取好友列表
      this.getMyFriends(token)
    } catch (error) {
      console.error('请求错误:', error)
    }
  },
  methods: {
    toggleFriendsModal() {
      this.showFriendsModal = !this.showFriendsModal
    },
    showInkImage() {
      this.showInkImageModal = true // 显示墨水图片
    },
    showWordImage() {
      this.showWordModal = true // 显示墨水图片
    },
    showEnvelopeImage() {
      this.showEnvelopeModal = true // 显示墨水图片
    },
    async getMyFriends(token) {
      try {
        const response = await axios.get('/api/user/getMyFriends', {
          headers: {
            Authorization: token
          }
        })
        if (response.data.code === 200) {
          this.friends = response.data.data
        } else {
          console.error('获取好友列表失败:', response.data.msg)
        }
      } catch (error) {
        console.error('获取好友列表错误:', error)
      }
    },
    async getUserInfo(token) {
      const response = await axios.get('/api/user/getUserInfo', {
        headers: {
          Authorization: token
        }
      })
      return response
    },
    async getUserMoney(token) {
      const response = await axios.get('/api/user/getUserMoney', {
        headers: {
          Authorization: token
        }
      })
      return response
    },
    async getUserRepository(token) {
      const response = await axios.get('/api/user/getUserRepository', {
        headers: {
          Authorization: token
        }
      })
      return response
    },
    showEditModal() {
      this.editModalVisible = true
    },
    hideEditModal() {
      this.editModalVisible = false
    },
    // async updateUserName() {
    //   try {
    //     const token = useUserStore().token
    //     const response = await axios.post('/api/user/updateUsername', this.user, {
    //       headers: {
    //         Authorization: token
    //       }
    //     })
    //     if (response.data.code === 200) {
    //       this.hideEditModal()
    //       // 更新成功后重新加载用户信息
    //       this.getUserInfo(token)
    //     } else {
    //       alert(response.data.msg)
    //     }
    //   } catch (error) {
    //     console.error('更新用户信息错误:', error)
    //   }
    // },
    async updateUserInfo() {
      try {
        const token = useUserStore().token
        const response = await axios.post('/api/user/updateUserInfo', {
          nickname: this.user.nickname,
          avatar: this.user.avatar, // 确保 user 对象有 avatar 属性
          sex: this.user.sex
        }, {
          headers: {
            Authorization: token
          }
        })
        if (response.data.code === 200) {
          this.hideEditModal()
          // 重新加载用户信息
          this.getUserInfo(token)
          alert(response.data.msg || '操作成功')
        } else {
          alert(response.data.msg || '操作失败')
        }
      } catch (error) {
        console.error('更新用户信息错误:', error)
        alert('更新用户信息时发生错误')
      }
      try {
        const token = useUserStore().token
        const response = await axios.post('/api/user/updateUsername', this.user, {
          headers: {
            Authorization: token
          }
        })
        if (response.data.code === 200) {
          this.hideEditModal()
          // 更新成功后重新加载用户信息
          this.getUserInfo(token)
        } else {
          alert(response.data.msg)
        }
      } catch (error) {
        console.error('更新用户信息错误:', error)
      }
    }
  }
}
</script>

<style scoped>
/* .container {
  position: relative;
  top: -60px;
  padding-top: 120px;
  box-sizing: border-box;
  min-height: 100vh;
  width: 100%;
  background-image: url(../../assets/imgs/background.jpg);
  background-size: 100% 100%;
  background-position: top center;
} */
.banner {
    position: relative;
    margin: 0 auto;
    width: 1300px;
    height: 800px;
  }
  .banner .profile{
    position: absolute;
    top: -20px;
    left: 35%;
    transform: translateY(-50%);
    width: 400px;
    height: 100px;
  }
  .banner h1 img {
    width: 100%;
    height: 100%;
  }
  .data {
    position: relative;
    top: 60px;
    left: 50px;
    width: 350px;
    height: 640px;
    padding-top: 30px;
    box-sizing: border-box;
    margin-top: 60px;
    background-image: url(../../assets/imgs/profilebgd.png);
    background-position: center center;
    background-size: cover;
  }
  .data .pic {
    position: absolute;
    top: 50px;
    left: 50%;
    transform: translate(-50%,0);
    width: 250px;
    height: 200px;
  }
  .data .pic img {
    width: 100%;
    height: 100%;
  }
  .data .name {
    position: absolute;
    left: 20px;
    font-size: 42px;
    font-weight: bold;
    font-family: '华文新魏', sans-serif;
  }
    .data .userid {
    position: absolute;
    top: 50px;
    left: 20px;
    font-size: 22px;
    font-weight: bold;
    font-family: '华文中宋', sans-serif;
  }
  .userid span {
    font-size: 16px;
    font-weight: normal;
    margin-left: 2px;
    font-family: Arial, sans-serif;
  }
  .data .adress {
    position: absolute;
    top: 210px;
    left: 20px;
    font-size: 22px;
    font-weight: bold;
    font-family: '华文中宋', sans-serif;
  }
  .adress span {
    font-size: 16px;
    font-weight: normal;
    margin-left: 2px;
    font-family: Arial, sans-serif;
  }
  .data .money {
    position: absolute;
    top: 170px;
    left: 20px;
    font-size: 22px;
    font-weight: bold;
    font-family: '华文中宋', sans-serif;
  }
   .money span {
    position: absolute;
    left: 90px;
    top: 8px;
    font-size: 16px;
    font-weight: normal;
    font-family: Arial, sans-serif;
  }
   .data .sex {
    position: absolute;
    top: 90px;
    left: 20px;
    font-size: 22px;
    font-weight: bold;
    font-family: '华文中宋', sans-serif;
  }
  .data .email {
    position: absolute;
    top: 130px;
    left: 20px;
    font-size: 22px;
    font-weight: bold;
    font-family: '华文中宋', sans-serif;
  }
  .email span {
    position: absolute;
    left: 65px;
    top: 8px;
    font-size: 16px;
    font-weight: normal;
    font-family: Arial, sans-serif;
  }
   .sex span {
    font-size: 16px;
    font-weight: normal;
    font-family: Arial, sans-serif;
  }
  .store {
    position: absolute;
    left: 396px;
    top: 60px;
    width: 850px;
    height: 640px;
    background-image: url(../../assets/imgs/frame.png);
    background-position:center center;
    background-size:cover;
  }
  .store .bgd {
    position: absolute;
    top: 35px;
    left: 40px;
    width: 768px;
    height: 578px;
  }
  .data .information {
    position: relative;
    top: 240px;
    left: 25px;
    width: 300px;
    height: 300px;
    background-color: #ADA587;
  }
  .ink {
    position: absolute;
    bottom: 180px;
    left: 200px;
    cursor: pointer;
  }
  .pen {
    position: absolute;
    bottom: 180px;
    left: 330px;
    cursor: pointer;
  }
  .envelope {
    position: absolute;
    width: 100px;
    height: 70px;
    bottom: 180px;
    left: 450px;
    cursor: pointer;
  }
  .data .showEdit{
    position: absolute;
    bottom: 85px;
    left: 50px;
    width: 100px;
    height: 40px;
    background-color: #c0c0a8;
    border: 0;
    border-radius: 25px;
    cursor: pointer;
  }
  .data button:hover {
    background-color: #6f6f5e;
    color: white;
  }
  .edit-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 400px;
  background-color: #deddd3;
  border-radius: 25px;
  z-index: 1000;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.modal-content {
  position: relative;
}

.close {
  position: absolute;
  top: -40px;
  right: -10px;
  cursor: pointer;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input,
.form-group select {
  width: 80%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.save {
    width: 100px;
    height: 50px;
    background-color: rgb(194, 179, 153);
    border: 0;
    border-radius: 25px;
}
.save:hover {
  color: white;
  background-color: rgb(157, 138, 138);
  cursor: pointer;
}
.image-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 500px;
  height: 500px;
  transform: translate(-50%, -50%);
  z-index: 1000;
}
.image-modal span {
  position: absolute;
  top: 20px;
  right: 40px;
}

.modal-image {
 width: 100%;
}
.colorbox {
  position: absolute;
  top: 50px;
  left: 80px;
}
.box {
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 1px solid #ccc; /* 可选的边框样式 */
}
.penboxs {
  position: absolute;
  top: 50px;
  left: 50px;
}
.penbox {
  float: left;
  width: 80px;
  height: 60px;
  border: 1px solid #000000; /* 可选的边框样式 */
}
.envelopebox {
  float: left;
  width: 80px;
  height: 120px;
  margin-right: 10px;
  border: 1px solid #000000;
  background-position: center center;
  background-size: cover;
}
.friends-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 400px;
  background-color: #deddd3;
  border-radius: 25px;
  z-index: 1000;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.modal-content {
  position: relative;
}

.close {
  position: absolute;
  top: -40px;
  right: -10px;
  cursor: pointer;
}
.friends {
    position: absolute;
    top: 515px;
    left: 200px;
    width: 100px;
    height: 40px;
    background-color: #c0c0a8;
    border: 0;
    border-radius: 25px;
    cursor: pointer;
}

.friend {
  width: 80%;
  height: 80px;
  margin-left: 30px;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.friendname, .friendsex, .friendemail {
  font-size: 18px;
  margin-bottom: 5px;
}
</style>
