<template>
  <div class="banner">
    <div class="slide">
      <button class="pre" @click="prev">&lt;</button>
      <button class="next" @click="next">&gt;</button>
      <ul class="indicator">
        <li v-for="(image, index) in images" :key="index" :class="{ active: index === currentIndex }" @click="goTo(index)"></li>
      </ul>
      <img :src="currentImage" class="pic" alt="Slideshow">
      <div class="text">{{ texts[currentIndex] }}</div>
    </div>
    <div class="container">
      <div class="box">
        <div class="icon"></div>
        <div class="content">
          <h3>体验慢信方式</h3>
          <p>慢慢来，比较快。</p>
        </div>
      </div>
      <div class="box">
        <div class="icon"></div>
        <div class="content">
          <h3>用趣味方式了解文化</h3>
          <p>趣味学习，文化传承。</p>
        </div>
      </div>
      <div class="box">
        <div class="icon"></div>
        <div class="content">
          <h3>收集精美的卡片</h3>
          <p>精美卡片，学习升级。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexIntroduce',
  data() {
    return {
      images: [
        require('@/assets/imgs/bgd1.jpg'),
        require('@/assets/imgs/background.jpg')
        // require('@/assets/imgs/bgd3.jpg'),
        // require('@/assets/imgs/bj5.png'),
        // require('@/assets/imgs/bj6.png'),
        // require('@/assets/imgs/bj7.png'),
        // require('@/assets/imgs/bj8.png'),
        // require('@/assets/imgs/bj10.png'),
        // require('@/assets/imgs/bj9.jpg')
      ],
      texts: [
        '这里是第一张图片的文字内容',
        '这里是第二张图片的文字内容'
        // ...对应每张图片的文字内容
      ],
      currentIndex: 0
    }
  },
  computed: {
    currentImage() {
      return this.images[this.currentIndex]
    }
  },
  methods: {
    next() {
      if (this.currentIndex < this.images.length - 1) {
        this.currentIndex++
      } else {
        this.currentIndex = 0
      }
    },
    prev() {
      if (this.currentIndex > 0) {
        this.currentIndex--
      } else {
        this.currentIndex = this.images.length - 1
      }
    },
    goTo(index) {
      this.currentIndex = index
    }
  },
  mounted() {
    setInterval(this.next, 5000)
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
.banner {
  position: relative;
  width: 1200px;
  height: 700px;
  margin: 0 auto;
}
.container {
  display: flex;
  justify-content: space-around;
  flex-wrap: nowrap;
  overflow: auto;
  padding: 20px 40px;
  position: relative;
  top: 15px;
}
.box {
  position: relative;
  width: 350px;
  height: 150px;
  padding: 40px;
  background-color: #d5a758;
  margin-right: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  text-align: center;
  transition: transform 0.5s ease, box-shadow 0.5s ease;
}

.box .icon {
  width: 100px;
  height: 100px;
  margin: 0 auto;
  transition: box-shadow 0.5s ease;
}

.box .content h3 {
  font-size: 20px;
  margin-bottom: 10px;
}

.box .content p {
  line-height: 25px;
  margin-bottom: 20px;
}

.box .content img {
  width: 100%;
  height: auto;
  margin-top: 20px;
}

/* Card 1 */
.box:nth-child(1) .icon {
  background-size: cover;
}

.box:nth-child(1):hover .icon {
  box-shadow: 0 0 0 400px #8c795b;
  background: url('../../assets/imgs/backimg.png') center center no-repeat;
}

.box:nth-child(1):hover p {
  display: none;
}

/* Card 2 */
.box:nth-child(2) .icon {
  background-size: cover;
}

.box:nth-child(2):hover .icon {
  box-shadow: 0 0 0 400px #442c1e;
}

/* Card 3 */
.box:nth-child(3) .icon {
  background-size: cover;
}

.box:nth-child(3):hover .icon {
  box-shadow: 0 0 0 400px #3e451b;
}

.box:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.box::before {
  content: '';
  width: 50%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(255, 255, 255, .2);
  z-index: 2;
  transition: width 0.5s ease;
}

.box:hover::before {
  width: 100%;
}

.box .content {
  position: relative;
  z-index: 3;
}
/* 版心轮播图开始 */
.slide {
  position: relative;
  width: 100%;
  height: 500px;
  margin-top: 50px;
  overflow: hidden;
}

.slide .pic {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slide .btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  cursor: pointer;
  padding: 10px;
  font-size: 20px;
}

.slide .pre {
  position: absolute;
  z-index: 999;
  opacity: 0;
  top: 50%;
  left: 0px;
  width: 45px;
  height: 45px;
  border-radius: 50px;
  border: 0px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 25px;
  transition: all .3s linear;
  cursor: pointer;
  transform: translateY(-50%);
}

.slide .next {
  position: absolute;
  z-index: 999;
  opacity: 0;
  top: 50%;
  right: 0px;
  width: 45px;
  height: 45px;
  border-radius: 50px;
  border: 0px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 25px;
  cursor: pointer;
  transition: all .3s linear;
  cursor: pointer;
  transform: translateY(-50%);
}

.slide:hover .pre {
  opacity: 1;
}

.slide:hover .next {
  opacity: 1;
}

.slide .indicator {
  position: absolute;
  bottom: 45px;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 250px;
  height: 10px;
}

.indicator li {
  float: left;
  width: 20px;
  height: 5px;
  border-radius: 5px;
  margin-right: 6px;
  background-color: rgba(255, 255, 255, .5);
  cursor: pointer;
}

.indicator .active {
  width: 30px;
  height: 5px;
  border-radius: 5px;
  background-color: white;
}
.slide .text {
  position: absolute;
  top: 50%;
  left: 85%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  z-index: 10;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}
</style>
