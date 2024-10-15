<template>
  <div class="banner">
    <div class="pick" v-if="activeButton === 'smallbtn1'">
        <button class="bigbtn" @click="select('smallbtn2')">捡一个</button>
    </div>
    <div class="letter" v-if="activeButton === 'smallbtn2'">
    <div class="friend-modal" v-if="isFriendModalVisible">
   <div class="modal-content">
    <span class="close" @click="toggleFriendModal">&times;</span>
    <h2>成为好友</h2>
    <form @submit.prevent="sendFriendRequest">
      <div class="form-group">
        <label for="sender">写信人:</label>
        <input type="text" id="sender" v-model="friendRequest.sender" required>
      </div>
      <div class="form-group">
        <label for="friendAddress">个人地址:</label>
        <input type="text" id="friendAddress" v-model="friendRequest.friendAddress" required>
      </div>
      <div class="form-group special">
        <label for="friendContent" style="margin-bottom:20px">内容:</label>
        <textarea id="friendContent" v-model="friendRequest.content"></textarea>
      </div>
      <button type="submit">发送</button>
    </form>
  </div>
</div>
    <button class="bigbtn1">扔会海里</button>
    <button class="bigbtn2" @click="toggleFriendModal">成为好友</button>
    </div>
    <div class="write" v-if="activeButton === 'smallbtn3'">
     <div class="left">
          <h2>写信</h2>
          <form @submit.prevent="sendLetter">
            <!-- <div class="form-group">
              <label for="recipientUsername">收信人用户名:</label>
              <input type="text" id="recipientUsername" v-model="letter.recipientUsername" required>
            </div>
            <div class="form-group">
              <label for="recipientAddress">收信人地址:</label>
              <input type="text" id="recipientAddress" v-model="letter.recipientAddress" required>
            </div>
            <div class="form-group">
              <label for="senderAddress">我的地址:</label>
              <input type="text" id="senderAddress" v-model="letter.senderAddress" required>
            </div> -->
            <div class="form-group">
              <label for="stationery">选择信纸:</label>
              <select id="stationery" v-model="letter.stationery">
                <option v-for="stationery in stationeryOptions" :key="stationery.id" :value="stationery.id">
                  {{ stationery.name }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="penFont">选择笔的字体:</label>
              <select id="penFont" v-model="letter.penFont">
                <option v-for="font in penFonts" :key="font" :value="font">
                  {{ font }}
                </option>
              </select>
            </div>
            <div class="form-group special">
              <label for="letterContent">信件内容:</label>
              <textarea id="letterContent" v-model="letter.content" required style="margin-top:20px"></textarea>
            </div>
            <button>预览</button>
            <button type="submit">发送</button>
          </form>
        </div>
        <div class="right"></div>
      </div>
    <div class="friend" v-if="activeButton === 'smallbtn5'"></div>
    <div class="smallbtn1" @click="select('smallbtn1')" :class="activeButtonClass('smallbtn1')"
>捡漂流瓶</div>
    <div class="smallbtn2" @click="select('smallbtn4')" :class="activeButtonClass('smallbtn4')"
>新消息</div>
    <div class="smallbtn3" @click="select('smallbtn3')" :class="activeButtonClass('smallbtn3')"
>写漂流瓶</div>
</div>
</template>

<script>
export default {
  name: 'DriftingBottle',
  data() {
    return {
      activeButton: 'smallbtn1',
      isFriendModalVisible: false, // 控制成为好友弹窗的显示
      friendRequest: { // 初始化 friendRequest 对象
        sender: '',
        friendAddress: '',
        content: '希望和你成为好友！'
      },
      letter: {
        recipientUsername: '',
        recipientAddress: '',
        senderAddress: '',
        stationery: null,
        penFont: null,
        content: ''
      },
      stationeryOptions: [
        { id: 1, name: '信纸1' },
        { id: 2, name: '信纸2' },
        { id: 3, name: '信纸3' }
      ],
      penFonts: ['字体1', '字体2', '字体3']
    }
  },
  methods: {
    select(button) {
      this.activeButton = button
    },
    toggleFriendModal() {
      this.isFriendModalVisible = !this.isFriendModalVisible
    },
    showWrite() {
      // 这里是你想要在页面加载时执行的代码
      this.activeButton = 'smallbtn1' // 假设 showWrite 就是激活 'smallbtn3' 对应的内容
    },
    sendFriendRequest() {
      console.log('发送好友请求', this.friendRequest)
      this.isFriendModalVisible = false
    },
    sendLetter() {
      console.log('发送信件', this.letter)
    }
  },
  computed: {
    activeButtonClass() {
      return (button) => {
        return this.activeButton === button ? 'active' : ''
      }
    }
  },
  mounted() {
    this.showWrite() // 确保 showWrite 方法已经定义
  }
}
</script>

<style scoped>
 .banner {
  margin-top: 40px;
  width: 1200px;
  height: 730px;
  background-color: rgb(248, 235, 211);
  display: flex; /* 使用 Flexbox 布局 */
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
  background-color: white;
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
  top: 20px;
  width: 550px;
  height: 650px;
  background-color: white;
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
}

.modal-content {
  border-radius: 5px;
  width: 300px;
  margin-top: 50px;
  background-color: rgb(248, 235, 211);
}

.close {
  position: absolute;
  top: 0px;
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
.smallbtn1.active, .smallbtn2.active, .smallbtn3.active {
  background-color: #73705d; /* 激活状态下的背景颜色 */
  color: white;
}
</style>
