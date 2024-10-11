<template>
  <div class="banner">
    <button class="write" @click="showWrite" :class="{ 'active': currentView === 'write'}">写信</button>
    <button class="send" @click="showSend" :class="{ 'active': currentView === 'send' }" >已写的信</button>
    <div class="content" v-if="showContent">
      <div v-if="currentView === 'write'">
    <div class="left">
    <form>
    <label for="font">选择字体：</label>
    <select ref="fontSelect">
      <option value="不二情书字体">不二情书字体</option>
      <option value="图北方行书">图北方行书</option>
      <option value="博洋楷体">博洋楷体</option>
      <option value="博洋草体">博洋草体</option>
      <option value="博洋行书">不二情书字体</option>
      <option value="博洋行楷">图北方行书</option>
      <option value="博洋欧体">博洋欧体</option>
      <option value="方正字迹-洪俊硬笔行草简体">方正字迹-洪俊硬笔行草简体</option>
      <option value="方正字迹-洪俊硬笔行草繁体">方正字迹-洪俊硬笔行草繁体</option>
      <option value="方正字迹-豪放行书繁体">方正字迹-豪放行书繁体</option>
      <option value="方正字迹-长江行书简体">方正字迹-长江行书简体</option>
      <option value="蔡云汉繁体行书书法字体">蔡云汉繁体行书书法字体</option>
    </select>

    <br><br>

    <label for="color">选择颜色：</label>
    <select ref="colorSelect">
      <option value="#666666" style="background-color: #666666; color: white;">&nbsp;&nbsp;墨色&nbsp;&nbsp;</option>
      <option value="#A52328" style="background-color: #A52328; color: black;">&nbsp;&nbsp;朱砂色&nbsp;&nbsp;</option>
      <option value="#F9E009" style="background-color: #F9E009; color: black;">&nbsp;&nbsp;金色&nbsp;&nbsp;</option>
      <!-- 可以添加更多颜色选项 -->
    </select>

    <br><br>

    <label for="paper">选择信纸：</label>
    <select ref="paperSelect">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>

    <br><br>
        </form>
        </div>
         <div class="text">
              <label for="letterContent">信件内容:</label>
              <textarea id="letterContent" v-model="letter.content" required></textarea>
          </div>
          <div class="right">
            <img :src="imageUrl" alt="生成的信件" v-if="imageUrl">
          </div>
          <div class="buttons">
              <button @click="generateLetter">生成</button>
              <button @click="showConfirmDialog = true">确认</button>
          </div>
              <!-- 弹窗组件 -->
    <div v-if="showConfirmDialog" class="modal">
    <div class="modal-content">
      <span class="close" @click="showConfirmDialog = false">&times;</span>
      <h2>确认信件信息</h2>
      <form @submit.prevent="submitLetterInfo">
        <div>
          <label for="senderUsername">寄信人用户名：</label>
          <input type="text" v-model="letter.senderUsername" required>
        </div>
        <div>
          <label for="senderAddress">寄信人地址：</label>
          <input type="text" v-model="letter.senderAddress" required>
        </div>
        <div>
          <label for="recipientUsername">收信人用户名：</label>
          <input type="text" v-model="letter.recipientUsername" required>
        </div>
        <div>
          <label for="recipientAddress">收信人地址：</label>
          <input type="text" v-model="letter.recipientAddress" required>
        </div>
        <button type="submit">提交</button>
      </form>
    </div>
  </div>
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
import axios from 'axios'
export default {
  name: 'WriteLetter',
  data() {
    return {
      imageUrl: '',
      showConfirmDialog: false, // 控制弹窗的显示
      letter: {
        // ...（省略其他信件属性）...
        senderUsername: '',
        senderAddress: '',
        recipientUsername: '',
        recipientAddress: ''
      },
      showContent: false,
      currentView: '',
      newLayout: false, // 控制表单布局
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
    },
    submitLetterInfo() {
      // 处理提交信件信息的逻辑
      console.log('提交信件信息:', this.letter)
      this.showConfirmDialog = false // 提交后关闭弹窗
    },
    generateLetter() {
      const font = this.$refs.fontSelect.value// 获取字体下拉菜单的值
      const color = this.$refs.colorSelect.value // 获取颜色下拉菜单的值
      const stationery = this.$refs.paperSelect.value// 获取信纸下拉菜单的值
      const text = this.letter.content // 获取信件内容

      // 构造请求数据
      const requestData = {
        font,
        color,
        stationery,
        text
      }

      // 发送请求到后端
      axios.get('/api/generatelmage', requestData)
        .then(response => {
        // 假设后端返回的图片URL在response.data.imageUrl中
          this.imageUrl = response.data.imageUrl
        })
        .catch(error => {
          console.error('请求失败:', error)
        })
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
  top: 0;
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
  left: 0;
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
  width: 320px;
  height: 200px;
  top: 20px;
  left: 180px;
  padding: 20px;
  box-sizing: border-box;
  background-color: rgb(222, 201, 162);
  border-radius: 25px;
  text-align: left;
}

.right {
  position: absolute;
  left: 545px;
  top: 125px;
  width: 640px;
  height: 450px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
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
.buttons {
  position: absolute;
  bottom: 10px;
  left: 260px;
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
.text {
  position: absolute;
  top: 200px;
  left: 140px;
  width: 400px;
  height: 500px;
}
.text label {
  display: block;
  margin-bottom: 5px;
}
.text textarea {
  width: 350px;
  height: 400px;
  padding: 8px;
  border-radius: 4px;
  resize: none;
  outline: none;
  border: 0;
}
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.modal-content input {
  width: 80%;
  height: 10px;
  padding: 8px;
  border-radius: 4px;
  resize: none;
  outline: none;
}
.close {
  position: absolute;
  top: 30px;
  right: 30px;
}
</style>
