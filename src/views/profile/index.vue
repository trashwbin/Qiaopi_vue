<template>
  <div class="container">
    <div class="banner">
      <h1 class="profile"><img src="../../assets/imgs/profile.png" alt=""></h1>
      <div class="data">
        <div class="pic"><img src="../../assets/default-avatar.png" alt=""></div>
        <div class="name">{{ user.nickname }}</div>
        <div class="userid">用户名：<span>{{ user.username }}</span></div>
        <div class="adress">个人地址: <span>{{ user.address }}</span></div>
        <div class="money">猪仔钱：<span>{{ money }}</span></div>
        <div class="sex">性别：<span>{{ user.sex }}</span></div>
        <div class="email">邮箱：<span>{{ user.email }}</span></div>
        <button @click="showEditModal">修改内容</button>
      </div>
      <div class="store">
        <h1>我的仓库</h1>
        <div v-for="item in repository.fonts" :key="item.id">
          <h2>{{ item.name }}</h2>
          <img :src="item.previewImage" alt="字体预览" />
        </div>
        <div v-for="item in repository.papers" :key="item.id">
          <h2>{{ item.name }}</h2>
          <img :src="item.previewImage" alt="信纸预览" />
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
import { getUserMoney } from '@/api/user'
import useUserStore from '@/store/modules/user'

export default {
  name: 'UserProfile',
  data() {
    return {
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
    } catch (error) {
      console.error('请求错误:', error)
    }
  },
  methods: {
    getUserMoney() {
      getUserMoney().then(res => {
        this.money = res.data.money
      })
    },
    async getUserInfo(token) {
      const response = await axios.get('/api/user/getUserInfo', {
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
.container {
  position: relative;
  top: -60px;
  padding-top: 120px;
  box-sizing: border-box;
  min-height: 100vh;
  width: 100%;
  background-image: url(../../assets/imgs/background.jpg);
  background-size: 100% 100%;
  background-position: top center;
}

.banner {
  position: relative;
  margin: 0 auto;
  width: 1300px;
  height: 800px;
}

.banner .profile {
  position: absolute;
  top: -80px;
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
  left: 50px;
  width: 350px;
  height: 600px;
  padding-top: 30px;
  box-sizing: border-box;
  margin-top: 60px;
  background-color: rgb(194, 179, 153);
}

.data .pic {
  position: absolute;
  top: 0;
  width: 350px;
  height: 250px;
}

.data .pic img {
  width: 100%;
  height: 100%;
}

.data .name {
  position: absolute;
  left: 20px;
  top: 265px;
  font-size: 42px;
  font-weight: bold;
  font-family: '华文新魏', sans-serif;
}

.data .userid {
  position: absolute;
  top: 320px;
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
  top: 480px;
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
  top: 440px;
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
  top: 360px;
  left: 20px;
  font-size: 22px;
  font-weight: bold;
  font-family: '华文中宋', sans-serif;
}

.data .email {
  position: absolute;
  top: 400px;
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
  left: 600px;
  top: 0;
  width: 600px;
  height: 650px;
  background-color: rgb(154, 141, 141);
}

.store img {
  width: 50px;
  height: 100px;
}

.data button {
  position: absolute;
  bottom: 20px;
  left: 100px;
  width: 100px;
  height: 50px;
  background-color: #dcdcd9;
  border: 0;
  border-radius: 25px;
  cursor: pointer;
}

.data button:hover {
  background-color: #9b9b95;
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
</style>
