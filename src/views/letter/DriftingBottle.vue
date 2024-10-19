<template>
  <div class="banner">
    <div class="pick" v-if="activeButton === 'smallbtn1'">
      <button class="bigbtn" @click="showDriftBottle(); select('smallbtn2')">捡一个</button>
    </div>
    <div class="letter" v-if="activeButton === 'smallbtn2'" :style="'background-image: url(' + letter.url + ');'">
      <div class="friend-modal" v-if="isFriendModalVisible">
        <div class="modal-content">
          <span class="close" @click="toggleFriendModal">&times;</span>
          <h2>成为好友</h2>
          <form @submit.prevent="sendFriend">
            <div class="map">
              <avue-input-map :autosize="{ minRows: 1, maxRows: 4 }" placeholder="我的地址"
                v-model="friendRequest.giveAddresss" style="width:80%;margin:0 auto;"></avue-input-map>
            </div>
            <div class="form-group special">
              <label for="friendContent" style="margin-bottom:20px">内容:</label>
              <textarea id="friendContent" v-model="friendRequest.context"></textarea>
            </div>
            <button type="submit" @click="sendFriendRequest">发送</button>
          </form>
        </div>
      </div>
      <button class="bigbtn1" @click="throwBackBottle">扔回海里再捡一个</button>
      <button class="bigbtn2" @click="toggleFriendModal">成为好友</button>
    </div>
    <div class="write" v-if="activeButton === 'smallbtn3'">
      <div class="left">
        <h2>写漂流瓶</h2>
        <form @submit.prevent="sendLetter">
          <div class="map">
            <avue-input-map :autosize="{ minRows: 1, maxRows: 4 }" placeholder="请选择寄信地址" v-model="letter.senderAddress"
              style="width:80%;margin:0 auto;"></avue-input-map>
          </div>
          <div class="form-group special">
            <label for="letterContent">信件内容：</label>
            <textarea id="letterContent" v-model="letter.content" required style="margin-top:20px"></textarea>
          </div>
          <button type="submit" @click="generateDriftBottle">发送</button>
        </form>
      </div>
      <div class="right" :style="{ 'background-image': `url(${bottleImageUrl})` }"></div>
    </div>
    <div class="friend" v-if="activeButton === 'smallbtn5'"></div>
    <div class="smallbtn1" @click="select('smallbtn1')" :class="activeButtonClass('smallbtn1')">捡漂流瓶</div>
    <div class="smallbtn2" @click="select('smallbtn4');" :class="activeButtonClass('smallbtn4')">
      新消息
      <div v-if="hasUnreadRequests" class="red-dot"></div>
    </div>
    <div class="smallbtn3" @click="select('smallbtn3')" :class="activeButtonClass('smallbtn3')">写漂流瓶</div>
    <div class="friend" v-if="activeButton === 'smallbtn4'">
      <div v-for="request in friendRequests" :key="request.id" class="request-content">
        <div class="content">
          <img :src="request.senderAvatar" alt="Avatar" class="avatar" />
          <div class="username">{{ request.senderName }}：</div>
          <div class="context">{{ request.content }}</div>
          <div class="time">{{ new Date(request.createTime).toLocaleString() }}</div>
        </div>
        <button @click="acceptFriendRequest(request.id)" class="button1">接受</button>
        <button @click="rejectFriendRequest(request.id)" class="button2">拒绝</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui'
// import axios from 'axios'
// import useUserStore from '@/store/modules/user'

import { showDriftBottle, generateDriftBottle, throwBackBottle, sendFriendRequest, ProcessingFriendRequests, BecomeFriend } from '@/api/drifting'
export default {
  name: 'DriftingBottle',
  data() {
    return {
      senderAddress: [116.397455, 39.909187, '北京市东城区东华门街道天安门'],
      // giveAddresss: [116.397455, 39.909187, '北京市东城区东华门街道天安门'],
      currentBottleId: null, // 存储当前漂流瓶的 ID
      requestStatus: {},
      friendRequests: [],
      activeButton: 'smallbtn1',
      isFriendModalVisible: false, // 控制成为好友弹窗的显示
      friendRequest: { // 初始化 friendRequest 对象
        giveAddresss: {
          id: 0,
          formattedAddress: '',
          longitude: 0,
          latitude: 0,
          isDefault: 'ad'
        },
        context: '希望与你成为好友~'
      },
      letter: {
        senderAddress: {
          id: 0,
          formattedAddress: '',
          longitude: 0,
          latitude: 0,
          isDefault: 'ad'
        },
        content: ''
      },
      bottleImageUrl: ''
    }
  },
  methods: {
    select(button) {
      this.activeButton = button
    },
    newmessage() {
      if (this.activeButton === 4) {
        this.ProcessingFriendRequests()
      }
    },
    pickdrifting() {
      if (this.activeButton === 1) {
        this.showDriftBottle()
      }
    },
    toggleFriendModal() {
      this.isFriendModalVisible = !this.isFriendModalVisible
    },
    showWrite() {
      this.activeButton = 'smallbtn1' // 假设 showWrite 就是激活 'smallbtn3' 对应的内容
    },
    // async getDriftBottle() {
    //   const response = await getDriftBottle()
    //   if (response.code === 200) {
    //     this.letter.url = response.data.bottleUrl
    //     Message.success(response.msg)
    //   } else {
    //     Message.error(response.msg)
    //   }
    // },
    async showDriftBottle() {
      const response = await showDriftBottle()
      if (response.code === 200) {
        this.letter.url = response.data
        // this.currentBottleId = response.id
        Message.success(response.msg)
        // console.log(this.currentBottleId)
        this.$forceUpdate() // 强制更新视图
      } else {
        Message.error(response.msg)
      }
    },
    // async showDriftBottleAgain() {
    //   const response = await showDriftBottle()
    //   if (response.code === 200) {
    //     this.throwBackBottle()
    //     this.letter.url = response.data
    //     // this.currentBottleId = response.id
    //     Message.success(response.msg)
    //   } else {
    //     Message.error(response.msg)
    //   }
    // },
    async generateDriftBottle() {
      // 将senderAddress数组转换为对象格式
      if (this.letter.senderAddress) {
        this.letter.senderAddress = {
          id: this.letter.senderAddress.id || 0, // 根据实际情况设置
          formattedAddress: this.letter.senderAddress[2], // 地址字符串
          longitude: this.letter.senderAddress[0], // 经度
          latitude: this.letter.senderAddress[1], // 纬度
          isDefault: this.letter.senderAddress.isDefault || 'ad'
        }
      }
      if (!this.letter.senderAddress || !this.letter.content) {
        Message.error('请填写完整的发送者地址和内容')
        return
      }
      const response = await generateDriftBottle(this.letter)
      if (response.code === 200) {
        Message.success(response.msg)
        this.bottleImageUrl = response.data
      } else {
        Message.error(response.msg)
      }
    },
    async throwBackBottle() {
      const response = await throwBackBottle()
      if (response.code === 200) {
        Message.success(response.msg)
        // this.letter = ''
        this.showDriftBottle()
      } else {
        Message.error(response.msg)
      }
    },
    async sendFriendRequest() {
      if (this.friendRequest.giveAddresss) {
        this.friendRequest.giveAddresss = {
          id: this.friendRequest.giveAddresss.id || 0, // 根据实际情况设置
          formattedAddress: this.friendRequest.giveAddresss[2], // 地址字符串
          longitude: this.friendRequest.giveAddresss[0], // 经度
          latitude: this.friendRequest.giveAddresss[1], // 纬度
          isDefault: this.friendRequest.giveAddresss.isDefault || 'ad'
        }
      }
      // 确保giveAddresss是对象格式
      if (this.friendRequest.giveAddresss && this.friendRequest.context) {
        const response = await sendFriendRequest(this.friendRequest)
        if (response.code === 200) {
          this.isFriendModalVisible = false
          Message.success(response.msg)
        } else {
          Message.error(response.msg)
        }
      } else {
        Message.error('请填写完整的请求地址和内容')
      }
    },

    async ProcessingFriendRequests() {
      const response = await ProcessingFriendRequests()
      if (response.code === 200) {
        this.friendRequests = response.data
        if (this.friendRequest.length > 0) {
          Message.success('您有新的好友申请')
        }
      } else {
        Message.error(response.msg)
      }
    },
    async acceptFriendRequest(requestId) {
      try {
        const response = await BecomeFriend({ requestId: requestId, isAccepted: 1 })
        if (response.code === 200) {
          this.requestStatus[requestId] = 'accepted'
          Message.success(response.msg)
        } else {
          Message.error(response.msg)
        }
      } catch (error) {
        console.error('Accept friend request failed:', error)
        Message.error('接受好友请求失败')
      }
    },
    async rejectFriendRequest(requestId) {
      try {
        const response = await BecomeFriend({ requestId: requestId, isAccepted: 0 })
        if (response.code === 200) {
          this.requestStatus[requestId] = 'rejected'
          Message.success('拒绝好友请求失败')
        } else {
          Message.error(response.msg)
        }
      } catch (error) {
        console.error('Reject friend request failed:', error)
        Message.error('拒绝好友请求失败')
      }
    }

    // try {
    //   const response = await axios.get(url, { headers });
    //   if (response.data.code === 200) {
    //     this.friendRequests = response.data.data;
    //   } else {
    //     console.error(response.data.msg);
    //   }
    // } catch (error) {
    //   console.error('获取好友申请列表失败:', error);
    // }
  },
  computed: {
    activeButtonClass() {
      return (button) => {
        return this.activeButton === button ? 'active' : ''
      }
    },
    hasUnreadRequests() {
      return this.friendRequests.some(request => !request.read)
    }
    // formattedAddress() {
    //   return {
    //     formattedAddress: this.senderAddress[2],
    //     longitude: this.senderAddress[0],
    //     latitude: this.senderAddress[1]
    //   }
    // }
  },
  // watch: {
  //   // 监听senderAddress的变化，并更新friendRequest.giveAddresss
  //   formattedAddress: {
  //     handler(newVal) {
  //       this.friendRequest.giveAddresss = { ...newVal, isDefault: 'ad' }
  //     },
  //     immediate: true
  //   }
  // },
  mounted() {
    this.showWrite()
    // this.showDriftBottle()// 在组件挂载后获取漂流瓶图片
    this.ProcessingFriendRequests()
    // this.newmessage()
  }
}
</script>

<style scoped>
.banner {
  margin-top: 40px;
  width: 1200px;
  height: 730px;
  background-color: rgb(248, 235, 211);
  display: flex;
  /* 使用 Flexbox 布局 */
  align-items: flex-start;
}

.banner .pick {
  position: absolute;
  left: 20px;
  top: 20px;
  width: 950px;
  height: 600px;
  background-image: url(../../assets/imgs/drifting.jpg);
  background-position: center center;
  background-size: cover;
}

.banner .letter {
  position: absolute;
  left: 20px;
  top: 20px;
  width: 950px;
  height: 600px;
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
}

.banner .bigbtn {
  position: absolute;
  bottom: -90px;
  left: 370px;
  width: 180px;
  height: 70px;
  background-color: brown;
  border: 0;
  border-radius: 25px;
}

.banner .bigbtn1 {
  position: absolute;
  bottom: -90px;
  left: 280px;
  width: 180px;
  height: 70px;
  background-color: brown;
  border: 0;
  border-radius: 25px;
}

.banner .bigbtn2 {
  position: absolute;
  bottom: -90px;
  left: 500px;
  width: 180px;
  height: 70px;
  background-color: brown;
  border: 0;
  border-radius: 25px;
}

.banner .smallbtn1 {
  position: absolute;
  top: 20px;
  right: 62px;
  width: 100px;
  height: 50px;
  line-height: 50px;
  background-color: rgb(220, 212, 204);
  border: 0;
  border-radius: 25px;
}

.banner .smallbtn2 {
  position: absolute;
  top: 100px;
  right: 62px;
  width: 100px;
  height: 50px;
  line-height: 50px;
  background-color: rgb(220, 212, 204);
  border: 0;
  border-radius: 25px;
}

.banner .smallbtn3 {
  position: absolute;
  top: 180px;
  right: 62px;
  width: 100px;
  height: 50px;
  line-height: 50px;
  background-color: rgb(220, 212, 204);
  border: 0;
  border-radius: 25px;
}

.banner .write {
  position: absolute;
  left: 20px;
  top: 20px;
  width: 950px;
  height: 690px;
}

.left {
  position: absolute;
  width: 420px;
  top: 40px;
  left: 20px;
  padding: 20px;
  box-sizing: border-box;
  background-color: rgb(222, 201, 162);
  border-radius: 25px;
}

.right {
  position: absolute;
  left: 450px;
  top: 0px;
  width: 480px;
  height: 700px;
  background-position: center center;
  background-size: cover;
}

h2 {
  height: 30px;
}

.form-group label {
  display: block;
  height: 35px;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 80%;
  padding: 8px;
  border-radius: 4px;
  resize: none;
  outline: none;
  border: 0;
}

button {
  padding: 10px 20px;
  background-color: #73705d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
}

button:hover {
  background-color: #0056b3;
}

.friend-modal {
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.modal-content {
  border-radius: 5px;
  width: 300px;
  margin-top: 50px;
  background-color: rgb(173, 153, 117);
  text-align: center;
}

.close {
  position: absolute;
  top: 60px;
  right: 330px;
  cursor: pointer;
}

.form-group {
  height: 80px;
}

.form-group label {
  display: block;
  margin-bottom: 0px;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 60%;
  border-radius: 4px;
  resize: none;
  outline: none;
  border: 1px solid #ccc;
}

button {
  padding: 10px 20px;
  background-color: #73705d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
  margin-top: 50px;
}

button:hover {
  background-color: #35471a;
}

.smallbtn1.active,
.smallbtn2.active,
.smallbtn3.active {
  background-color: #73705d;
  /* 激活状态下的背景颜色 */
  color: white;
}

.red-dot {
  position: absolute;
  top: 0;
  right: 0;
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
}

.request-content {
  /* display: inline-block; */
  position: relative;
}

.content {
  width: 280px;
  height: 70px;
  border: 1px solid #000;
  background-color: white;
  text-align: center;
  margin-bottom: 30px;
}

.time {
  position: absolute;
  top: 50px;
  right: 0;
  font-size: 14px;
}

.button1 {
  position: absolute;
  top: -45px;
  left: 290px;
}

.request-content .button2 {
  position: absolute;
  top: -45px;
  left: 350px;
}

.avatar {
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  width: 35px;
  height: 35px;
}

.username {
  position: absolute;
  top: 50%;
  left: 80px;
  transform: translateY(-50%);
}

.context {
  position: absolute;
  top: 50%;
  left: 120px;
  transform: translateY(-50%);
}
</style>
