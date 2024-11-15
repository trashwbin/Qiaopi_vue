<template>
    <div class="banner">
      <div class="left">
        <img src="../../assets/imgs/exploreTitle.png" alt="" class="title">
        <div class="point">
        <router-link to="/explore"><img src="../../assets/imgs/point1.png" alt="" style="margin-bottom: 30px;"></router-link>
        <img src="../../assets/imgs/point2.png" alt="" @click="unlockWarning">
        <img src="../../assets/imgs/point2.png" alt="" @click="unlockWarning">
        <img src="../../assets/imgs/point2.png" alt="" @click="unlockWarning">
      </div>
      </div>
      <div class="right">
        <img src="../../assets/imgs/mengmei.png" alt="">
      </div>
    </div>
</template>

<script>
import { MessageBox } from 'element-ui'
export default {
  name: 'QiaopiImportStory',
  methods: {
    unlockWarning() {
      MessageBox.alert('此章节待解锁', '提示', {
        confirmButtonText: '确定',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.left {
  position: relative;
}
.title {
  position: absolute;
  left: 0;
}
.point {
  position: absolute;
  top: 100px;
  left: 200px;
  display: flex;
  flex-direction: column;
}
.point img {
  width: 400px;
  height: 100px;
  margin-bottom: 50px;
  cursor: pointer;
}
.right {
  position: relative;
  right: -400px;
}
.right img {
  width: 700px;
}
</style>
