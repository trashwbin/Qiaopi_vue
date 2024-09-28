<template>
  <div class="modal-overlay" v-if="visible" @click.self="closeModal">
    <div class="modal-container" @click.stop>
      <div class="modal-content">
        <div class="close-button" @click="closeModal">X</div>
        <h2 v-if="!newLayout">写信</h2>
        <form v-if="!newLayout" @submit.prevent="sendLetter">
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
          <button type="submit"> 生成信</button>
        </form>
        <div v-else class="new-layout">
          <div class="left-box"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      newLayout: false,
      letter: {
        recipientUsername: '',
        recipientAddress: '',
        senderAddress: '',
        stationery: '',
        penFont: '',
        content: ''
      },
      inputContent: '',
      stationeryOptions: [
        { id: '1', name: '经典纸' },
        { id: '2', name: '豪华纸' }
        // ...更多选项
      ],
      penFonts: ['楷书', '行书', '草书', '隶书', '篆书']
    }
  },
  methods: {
    openModal() {
      this.visible = true
      this.newLayout = false
      this.inputContent = ''
    },
    closeModal() {
      this.visible = false
    },
    sendLetter() {
      this.newLayout = true
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
  position: relative;
  background: #aaa89c;
  padding: 20px;
  border-radius: 10px;
  width: 600px;
  height: 700px;
}

.modal-content {
  margin: 70px auto;
  width: 600px;
  height: 800px;
}

.close-button {
  position: absolute;
  top: 5px;
  right: 5px;
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
  width: 300px;
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

.new-layout {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 400px;
}

.left-box {
  width: 600px;
  height: 700px;
  margin: 0 auto;
  margin-top: 160px;
  background-color: #eee;
  /* background: url('../../assets/imgs/envelopbg.jpg'); */
  background-size: cover;
}
</style>
