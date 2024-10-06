<template>
  <div class="banner">
    <button class="write" @click="showWrite" :class="{ 'active': currentView === 'write'}">写信</button>
    <button class="send" @click="showSend" :class="{ 'active': currentView === 'send' }" >已写的信</button>
    <div class="content" v-if="showContent">
      <div v-if="currentView === 'write'">
        <!-- 写信的内容 -->
        <div class="left">
          <h2>写信</h2>
          <form @submit.prevent="sendLetter">
            <div class="form-group">
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
            </div>
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
            <div class="form-group">
              <label for="letterContent">信件内容:</label>
              <textarea id="letterContent" v-model="letter.content" required></textarea>
            </div>
            <button>预览</button>
            <button type="submit">发送</button>
          </form>
        </div>
        <div class="right"></div>
      </div>
      <div v-else-if="currentView === 'send'">
        <!-- 已写信的内容 -->
        <h2>已写的信</h2>
        <p>这里是您已经写的信件...</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WriteLetter',
  data() {
    return {
      showContent: false,
      currentView: '',
      newLayout: false, // 控制表单布局
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
    showWrite() {
      this.showContent = true
      this.currentView = 'write'
    },
    showSend() {
      this.showContent = true
      this.currentView = 'send'
    },
    sendLetter() {
      // 处理信件发送逻辑
      console.log('发送信件:', this.letter)
      // 例如，发送到服务器或显示确认信息
    }
  },
  mounted() {
    this.showWrite()// 页面加载时自动触发
  }
}
</script>

<style scoped>
.banner {
  position: relative;
  margin-top: 40px;
  width: 1200px;
  height: 700px;
  background-color: blanchedalmond;
  display: flex; /* 使用 Flexbox 布局 */
  align-items: flex-start; /* 垂直对齐子元素 */
}

.write {
  position: absolute;
  left: 0;
  width: 150px;
  height: 350px;
  background-color:  rgb(183, 164, 164);
  border: 0;
  cursor: pointer; /* 将鼠标指针设置为手型 */
  outline: none; /* 移除焦点时的边框 */
}

.send {
  position: absolute;
  bottom: 0;
  width: 150px;
  height: 350px;
  background-color: rgb(183, 164, 164);
  border: 0;
  cursor: pointer;
  outline: none;
}

.content {
  flex-grow: 1; /* 占据剩余空间 */
  padding: 20px;
  border-left: 2px solid #ccc; /* 添加边框 */
}

.left {
  position: absolute;
  width: 420px;
  top: 50px;
  left: 180px;
  padding: 20px;
  box-sizing: border-box;
  background-color: rgb(222, 201, 162);
  border-radius: 25px;
}

.right {
  position: absolute;
  left: 620px;
  top: 25px;
  width: 550px;
  height: 650px;
  background-color: white;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
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
  background-color: #979064;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
}
.active {
  background-color: #885e5e; /* 更深的颜色 */
}
</style>
