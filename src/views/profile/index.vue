<template>
  <div class="container">
    <div class="banner">
      <h1 class="profile"><img src="../../assets/imgs/profile.png" alt=""></h1>
      <div class="data">
        <div class="pic"><img :src="user.avatar" alt=""></div>
        <div class="information">
          <div class="name">{{ user.nickname }}<el-link icon="el-icon-edit" class="edit" @click="showEditNicknameDialog"
              style="font-family:'华文中宋', sans-serif;">编辑</el-link></div>
          <!-- 修改昵称弹窗 -->
          <el-dialog title="修改昵称" :visible.sync="editNicknameDialogVisible" width="30%"
            @close="editNicknameDialogVisible = false">
            <el-form ref="nicknameForm" :model="user" label-width="80px">
              <el-form-item label="昵称">
                <el-input v-model="user.nickname" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="editNicknameDialogVisible = false" class="cancel">取消</el-button>
              <el-button type="primary" @click="updateNickname" style="background-color:#888B69;">确定</el-button>
            </span>
          </el-dialog>
          <div class="userid">用户名：<span>{{ user.username }}</span><el-link icon="el-icon-edit" class="edit"
              @click="showEditUsernameDialog">编辑</el-link></div>
          <el-dialog title="修改用户名" :visible.sync="editUsernameDialogVisible" width="30%"
            @close="editUsernameDialogVisible = false">
            <el-form ref="usernameForm" :model="user" label-width="80px">
              <el-form-item label="用户名">
                <el-input v-model="user.username" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="editUsernameDialogVisible = false" class="cancel">取消</el-button>
              <el-button type="primary" @click="updateUsername" style="background-color:#888B69;">确定</el-button>
            </span>
          </el-dialog>
          <div class="sex">性别：<span>{{ user.sex }}</span><el-link icon="el-icon-edit" class="edit"
              @click="showEditSexDialog">编辑</el-link></div>
          <!-- 修改性别弹窗 -->
          <el-dialog title="修改性别" :visible.sync="editSexDialogVisible" width="30%"
            @close="editSexDialogVisible = false">
            <el-form ref="sexForm" :model="user" label-width="80px">
              <el-form-item label="性别">
                <el-select v-model="user.sex" placeholder="请选择">
                  <el-option label="男" value="男"></el-option>
                  <el-option label="女" value="女"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="editSexDialogVisible = false" class="cancel">取消</el-button>
              <el-button type="primary" @click="updateSex" style="background-color:#888B69;">确定</el-button>
            </span>
          </el-dialog>
          <div class="email">邮箱：<span>{{ user.email }}</span></div>

          <!-- 地址列表弹窗 -->
          <div v-if="showAddressesModal" class="address-modal">
            <div class="modal-content">
              <span class="close" @click="showAddressesModal = false">&times;</span>
              <h2>我的地址</h2>
              <ul>
                <li v-for="item in addresses" :key="item.id">
                  {{ item.formattedAddress }} <!-- 显示地址信息 -->
                </li>
              </ul>
            </div>
          </div>
          <div class="friends-container">
            <!-- 好友列表浮窗 -->
            <div v-if="showFriendsModal" class="friends-modal">
              <div class="modal-content">
                <span class="close" @click="toggleFriendsModal">&times;</span>
                <h2>我的好友</h2>
                <div class="friends-container">
                  <div class="friend" v-for="friend in friends" :key="friend.id">
                    <div class="friendname">姓名：{{ friend.name }}</div>
                    <div class="friendsex">性别：{{ friend.sex }}</div>
                    <div class="friendemail">邮箱号：{{ friend.email }}</div>
                    <div class="friendadress">地址：{{ friend.address }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <a @click="showAddressesModal = true" class="address">查看我的地址</a>
        <a @click="toggleFriendsModal" class="friends">查看我的好友</a>
      </div>
      <div class="store">
        <img src="../../assets/imgs/store.png" alt="仓库" class="bgd">
        <img src="../../assets/imgs/color.png" alt="墨水" class="ink" @click="showInkImage">
        <img src="../../assets/imgs/pen.png" alt="笔" class="pen" @click="showWordImage">
        <img src="../../assets/imgs/envelope.png" alt="信纸" class="envelope" @click="showEnvelopeImage">
        <!-- 墨水展示台 -->
        <div v-if="showInkImageModal" class="image-modal">
          <div class="colorbox">
            <div class="box" v-for="color in inkColors" :key="color.id" :style="{ backgroundColor: color.hexCode }">
            </div>
          </div>
          <span class="close" @click="showInkImageModal = false">&times;</span>
          <img src="../../assets/imgs/mood.png" alt="墨水图片" class="modal-image" />
        </div>
        <!-- 字体展示台 -->
        <div v-if="showWordModal" class="image-modal">
          <div class="penboxs">
            <div class="penbox" v-for="font in wordFonts" :key="font.id">
              {{ font.name }}
            </div>
          </div>
          <span class="close" @click="showWordModal = false">&times;</span>
          <img src="../../assets/imgs/mood.png" alt="墨水图片" class="modal-image" />
        </div>
        <!-- 信纸展示台 -->
        <div v-if="showEnvelopeModal" class="image-modal">
          <div class="penboxs">
            <div class="envelopebox" v-for="paper in paperPreviews" :key="paper.id"
              :style="{ backgroundImage: 'url(' + paper.previewImage + ')' }">
            </div>
          </div>
          <span class="close" @click="showEnvelopeModal = false">&times;</span>
          <img src="../../assets/imgs/mood.png" alt="墨水图片" class="modal-image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import { getMyAddress, updateUsername, updateNickname, updateSex } from '@/api/user'
import axios from 'axios'
import useUserStore from '@/store/modules/user'

export default {
  name: 'UserProfile',
  data() {
    return {
      editSexDialogVisible: false, // 控制性别编辑弹窗显示的状态
      editNicknameDialogVisible: false, // 控制昵称编辑弹窗显示的状态
      editUsernameDialogVisible: false,
      showAddressesModal: false, // 控制地址列表弹窗显示的状态
      addresses: [],
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

      // 获取用户信息
      const userResponse = await this.getUserInfo(token)
      if (userResponse && userResponse.data.code === 200) {
        this.user = userResponse.data.data
      }

      // 获取用户的钱数
      const moneyResponse = await this.getUserMoney(token)
      if (moneyResponse && moneyResponse.data.code === 200) {
        this.money = moneyResponse.data.data.money
      }

      // 获取用户仓库信息
      const repoResponse = await axios.get('/api/user/getUserRepository', {
        headers: { Authorization: token }
      })
      if (repoResponse.data.code === 200 && repoResponse.data.data) {
        this.repository = repoResponse.data.data
        this.inkColors = repoResponse.data.data.fontColors // 存储墨水颜色信息
        this.wordFonts = repoResponse.data.data.fonts // 存储字体信息
        this.paperPreviews = repoResponse.data.data.papers // 存储信纸预览图信息
      }

      // 获取好友列表
      await this.getMyFriends(token)

      // 获取好友地址
      await this.updateFriendsAddresses(token)

      // 获取我的地址
      await this.fetchAddresses(token)
    } catch (error) {
      console.error('请求错误:', error)
    }
  },
  methods: {
    showEditSexDialog() {
      this.editSexDialogVisible = true
    },
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
      const userStore = useUserStore()
      userStore.getUserInfo(token).then(res => {
        this.user = res.data
      })
      // const response = await axios.get('/api/user/getUserInfo', {
      //   headers: {
      //     Authorization: token
      //   }
      // })
      // return response
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
    showEditNicknameDialog() {
      this.editNicknameDialogVisible = true
    },
    async updateNickname() {
      await updateNickname(this.user.nickname).then(res => {
        Message.success('修改昵称成功')
        this.user.nickname = res.data.nickname // 更新用户名
      })
    },
    async updateSex() {
      await updateSex(this.user.sex).then(res => {
        Message.success('修改昵称成功')
        this.user.sex = res.data.sex // 更新用户名
      })
    },
    fetchAddresses() {
      // 获取我的地址
      getMyAddress().then(res => {
        this.addresses = res.data
        for (let i = 0; i < this.addresses.length; i++) {
          if (this.addresses[i].isDefault) {
            this.senderAddress = this.addresses[i]
          }
        }
      })
    },
    async getFriendAddress(friendId, token) {
      try {
        const response = await axios.get('/api/user/getFriendAddress', {
          params: { friendId },
          headers: { Authorization: token }
        })
        if (response.data.code === 200 && response.data.data.length > 0) {
          return response.data.data[0].formattedAddress
        } else {
          console.error('获取好友地址失败:', response.data.msg)
          return null
        }
      } catch (error) {
        console.error('获取好友地址错误:', error)
        return null
      }
    },
    async updateFriendsAddresses(token) {
      for (const friend of this.friends) {
        const address = await this.getFriendAddress(friend.id, token)
        if (address) {
          this.$set(friend, 'address', address)
        }
      }
    },
    showEditUsernameDialog() {
      this.editUsernameDialogVisible = true
    },
    // 更新用户名
    async updateUsername() {
      await updateUsername(this.user.username).then(res => {
        Message.success('修改用户名成功')
        this.user.username = res.data.username // 更新用户名
      })
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

.banner .profile {
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
  transform: translate(-50%, 0);
  width: 250px;
  height: 200px;
}

.data .pic img {
  width: 100%;
  height: 100%;
}

.data .name {
  position: absolute;
  top: 10px;
  left: 20px;
  font-size: 42px;
  font-weight: bold;
  font-family: '华文新魏', sans-serif;
}

.data .userid {
  position: absolute;
  top: 70px;
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

.data .sex {
  position: absolute;
  top: 110px;
  left: 20px;
  font-size: 22px;
  font-weight: bold;
  font-family: '华文中宋', sans-serif;
}

.data .email {
  position: absolute;
  top: 150px;
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
  background-position: center center;
  background-size: cover;
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

.data .showEdit {
  position: absolute;
  bottom: 85px;
  left: 50px;
  cursor: pointer;
}

.edit-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 400px;
  background-image: url(../../assets/imgs/profilebgd.png);
  border-radius: 25px;
  z-index: 1000;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.address-modal {
  position: fixed;
  /* 使用固定定位 */
  top: 50%;
  /* 定位到页面的垂直中心 */
  left: 50%;
  /* 定位到页面的水平中心 */
  transform: translate(-50%, -50%);
  /* 使弹窗正好位于中心 */
  width: 300px;
  /* 弹窗的宽度 */
  background-image: url(../../assets/imgs/profilebgd.png);
  border-radius: 8px;
  /* 弹窗的边框圆角 */
  z-index: 1000;
  /* 确保弹窗在最上层 */
  padding: 20px;
  /* 弹窗内边距 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  /* 弹窗的阴影 */
}

ul {
  list-style: none;
  /* 移除列表项的默认样式 */
  padding: 0;
  /* 移除默认的内边距 */
}

li {
  margin-bottom: 10px;
  /* 列表项之间的间距 */
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
  border: 1px solid rgb(194, 179, 153);
  border-radius: 4px;
}

.save {
  width: 100px;
  height: 50px;
  background-color: #c0c0a8;
  border: 0;
  border-radius: 25px;
}

.save:hover {
  color: white;
  background-color: #6f6f5e;
  ;
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
  border: 1px solid #ccc;
  /* 可选的边框样式 */
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
  border: 1px solid #000000;
  /* 可选的边框样式 */
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
  background-image: url(../../assets/imgs/profilebgd.png);
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
  top: 500px;
  left: 180px;
  cursor: pointer;
  color: #565648;
}

.friend {
  width: 80%;
  height: 90px;
  text-align: left;
  margin-left: 30px;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #c0c0a8;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.friendname,
.friendsex,
.friendemail {
  font-size: 15px;
  margin-bottom: 5px;
}

.address {
  position: absolute;
  top: 500px;
  left: 70px;
  font-size: 14px;
  cursor: pointer;
  color: #565648;
}

.data a {
  font-size: 15px;
}

.cancel:hover {
  border: #6f6f5e 1px solid;
  background-color: #e2ddcb;
  color: #6f6f5e;
}

.el-link:hover {
  color: #6f6f5e;
}

.el-link {
  margin-left: 20px;
}
</style>
