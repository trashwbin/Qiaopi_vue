<template>
  <!-- 这里放置你的侨宝图标 -->
  <div class="qiaobao" style="transition: transform 0.3s ease;" @mousedown="startDrag" @mousemove="dragImage"
    @mouseup="endDrag">
    <img src="../../assets/ai/qiaobao8.gif" alt="侨宝">
  </div>

</template>

<script>
export default {
  name: 'QiaoBaoAI',
  data() {
    return {
      isDragging: false,
      startX: 0,
      startY: 0,
      initialX: 0,
      initialY: 0,
      marginLeft: 0,
      marginTop: 0
    }
  },
  methods: {
    // 点击小侨宝图标
    clickQiaobao() {
      // 点击小侨宝图标后的操作
      console.log('点击了小侨宝图标')
    },
    startDrag(event) {
      event.preventDefault()
      console.log('start drag')
      this.startX = event.clientX
      this.startY = event.clientY

      this.initialX = parseFloat(this.$el.style.left) || 0
      this.initialY = parseFloat(this.$el.style.top) || window.innerHeight * 0.8

      this.isDragging = true

      window.addEventListener('mousemove', this.dragImage)
      window.addEventListener('mouseup', this.endDrag)
    },
    dragImage(event) {
      console.log('dragging')
      if (!this.isDragging) return

      event.preventDefault()
      const newX = this.initialX + (event.clientX - this.startX)
      const newY = this.initialY + (event.clientY - this.startY)

      this.$el.style.left = `${newX}px`
      this.$el.style.top = `${newY}px`
    },
    endDrag() {
      console.log('end drag')
      this.isDragging = false
      window.removeEventListener('mousemove', this.dragImage)
      window.removeEventListener('mouseup', this.endDrag)
    }
  }
}
</script>

<style scoped>
.qiaobao {
  position: fixed;
  left: 3%;
  top: 80%;
  width: 10vw;
  height: 15vh;
  z-index: 1000;
  max-width: 100px;
  max-height: 150px;
}

.qiaobao:hover {
  cursor: pointer;
}

.qiaobao img {
  width: 100%;
  height: 100%;
}
</style>
