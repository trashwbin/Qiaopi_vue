<template>
  <div class="modal-overlay" v-if="visible" @click.self="closeModal">
    <div class="modal-container" @click.stop>
      <div class="modal-content">
        <div class="close-button" @click="closeModal">X</div>
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
            <label for="stationery">选择笔纸:</label>
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
          <button type="submit">发送</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      letter: {
        recipientUsername: '',
        recipientAddress: '',
        senderAddress: '',
        stationery: '',
        penFont: '',
        content: ''
      },
      stationeryOptions: [
        { id: '1', name: '经典纸' },
        { id: '2', name: '豪华纸' }
        // ...更多选项
      ],
      penFonts: ['楷书', '行书', '草书', '隶书', '篆书'] // 笔的字体选项
    }
  },
  methods: {
    openModal() {
      this.visible = true
    },
    closeModal() {
      this.visible = false
    },
    sendLetter() {
      // 发送信件的逻辑
      console.log('Sending letter:', this.letter)
      // 模拟发送信件
      alert('信件已发送!')
      this.closeModal()
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-container {
  background: #aaa89c;
  padding: 20px;
  border-radius: 10px;
  width: 350px;
}

.modal-content {
  margin: 0 auto;
  max-width: 300px;
}

.close-button {
  float: right;
  cursor: pointer;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  outline: none;
  border: 0;
  border-radius: 20px;
  resize: none;
}

button {
    width: 100px;
    height: 50px;
    border-radius: 50px;
    background-color: #73705d;
    border: 0px;
    color: white;
}
</style>
