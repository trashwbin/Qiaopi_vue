<template>
  <div class="banner">
    <div class="tag1"><img src="../../assets/imgs/tag1.png" alt=""><span>信纸</span></div>
    <div class="tag2"><img src="../../assets/imgs/tag2.png" alt=""><span>墨水</span></div>
    <div class="tag3"><img src="../../assets/imgs/tag3.png" alt=""><span>字体</span></div>
  </div>
</template>

<script>
export default {
  name: 'QiaopiShop'
}
</script>

<style scoped>
.banner {
  position: relative;
  margin-top: 40px;
  width: 1200px;
  height: 700px;
  background-image: url(../../assets/imgs/storebgd.png);
  background-position: center center;
  background-size: cover;
}
.tag1,.tag2,.tag3 {
  position: absolute;
  left: -100px;
  width: 100px;
  height: 80px;
}
.tag1 {
  top: 20px;
}
.tag2 {
  top: 120px;
}
.tag3 {
  top: 220px;
}
.tag1 img,.tag2 img,.tag3 img {
  width: 100%;
  height: 100%;
}
.tag1 span,.tag2 span,.tag3 span {
  position: absolute;
  top: 20px;
  left: 50px;
  z-index: 100;
  color: white;
}
</style>
