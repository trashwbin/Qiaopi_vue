<template>
    <div class="banner">
        <img src="../../assets/imgs/answer.png" alt="" class="bgd" v-show="showImage">
    <p v-show="showImage">{{ paragraphs[currentParagraph] }}</p>
    <a href="#" class="nexttick" @click.prevent="nextTick" v-show="showImage">继续</a>
     <el-carousel :interval="4000" type="card" height="400px" v-show="!showImage">
    <el-carousel-item v-for="item in 3" :key="item">
      <h3 class="medium">{{ item }}</h3>
    </el-carousel-item>
  </el-carousel>
    </div>
</template>

<script>
export default {
  name: 'GameKnow',
  data() {
    return {
      paragraphs: [
        '在20世纪初，中国东南沿海的许多家庭依靠海外华侨寄回的侨批来维持生计。侨批不仅承载着金钱，更承载着远方亲人的思念和期望。在这个信息传递不易的时代，水客成为了连接海内外的重要纽带。',
        '你出生在一个有着悠久水客传统的家族。你的祖父和父亲都曾是水客，他们的故事和经历让你对这份工作充满了敬意和向往。今天，你将踏上你的第一次水客之旅，从马来西亚携带一批侨批返回广东潮汕。',
        '在出发前，你的祖父把你叫到一边，递给你一个装满侨批的旧皮箱，并对你说：‘这些侨批比黄金还要珍贵，它们是家人之间的桥梁。你必须确保每一份侨批都能安全送达。’',
        '为了帮助你更好地完成这次任务，我会问你一些关于侨批文化的问题，每答对一个问题，你将获得一个猪仔钱积分这些积分将作为你旅程中的储备。'
      ],
      currentParagraph: 0,
      showImage: true // 新增一个数据属性来控制图片的显示
    }
  },
  methods: {
    nextTick() {
      if (this.currentParagraph < this.paragraphs.length - 1) {
        this.currentParagraph += 1 // 移动到下一个段落
      } else {
        this.currentParagraph = 0 // 重置段落索引
        this.showImage = false // 隐藏图片
      }
    }
  }
}
</script>

<style scoped>
.banner {
    position: relative;
    width: 1200px;
    height: 650px;
    margin-top: 55px;
    background: url(../../assets/imgs/sea.jpg) no-repeat;
}
.banner::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(0deg, rgba(0, 0, 0, .7), rgba(0, 0, 0, 0));
}
.bgd {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 80%;
}
p {
    position: absolute;
    top: 200px;
    left: 180px;
    right: 180px;
    font-size: 25px;
}
.nexttick {
    position: absolute;
    bottom: 150px;
    right: 300px;
    text-decoration: none;
    color: #331316;
    cursor: pointer;
    z-index: 10;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .el-carousel {
    margin-top: 100px;
  }
</style>
