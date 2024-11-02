<template>
  <div class="banner">
    <img src="../../assets/imgs/answer.png" alt="" class="bgd" v-show="showImage">
    <p v-show="showWord">{{ paragraphs[currentParagraph] }}</p>
    <a href="#" class="nexttick" @click.prevent="nextTick" v-show="showWord">继续</a>
    <el-carousel :interval="4000" type="card" height="400px" v-show="showCarousel" :autoplay="false">
      <el-carousel-item v-for="(status, index) in lockStatus" :key="index" :style="{ height: '400px', width: '300px' }" style="margin-left: 130px;">
        <div
          v-if="lockStatus[index-1] === 1 || index === 0"
          @click="openpage(index)"
          style="height: 100%; width: 100%; cursor: pointer; display: flex; align-items: center; justify-content: center;">
          <h3 class="medium">{{ index + 1 }}</h3>
        </div>
        <div v-if="lockStatus[index-1] === 0" class="locked">
          <p class="locked-text">您未解锁</p>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { Message } from 'element-ui'
// import { userLoginPage, startAnswer } from '@/api/know'
import { userLoginPage, allAnswerToFront } from '@/api/know'
import CryptoJS from 'crypto-js'
export default {
  name: 'GameKnow',
  data() {
    return {
      paragraphs: [
        '在20世纪初，中国东南沿海的许多家庭依靠海外华侨寄回的侨批来维持生计。侨批不仅承载着金钱，更承载着远方亲人的思念和期望。在这个信息传递不易的时代，水客成为了连接海内外的重要纽带。',
        '你出生在一个有着悠久水客传统的家族。你的祖父和父亲都曾是水客，他们的故事和经历让你对这份工作充满了敬意和向往。今天，你将踏上你的第一次水客之旅，从马来西亚携带一批侨批返回广东潮汕。',
        '在出发前，你的祖父把你叫到一边，递给你一个装满侨批的旧皮箱，并对你说：‘这些侨批比黄金还要珍贵，它们是家人之间的桥梁。你必须确保每一份侨批都能安全送达。',
        '为了帮助你更好地完成这次任务，我会问你一些关于侨批文化的问题，每答对一个问题，你将获得一个猪仔钱积分这些积分将作为你旅程中的储备。'
      ],
      currentParagraph: 0,
      showImage: true,
      showWord: true,
      showCarousel: false,
      lockStatus: []
    }
  },
  methods: {
    nextTick() {
      if (this.currentParagraph < this.paragraphs.length - 1) {
        this.currentParagraph += 1
      } else {
        this.currentParagraph = 0
        this.showImage = false
        this.showWord = false
        this.showCarousel = true
        this.userLoginPage()
      }
    },
    async userLoginPage() {
      try {
        const res = await userLoginPage()
        if (res.code === 200) {
          this.lockStatus = res.data
          Message.success(res.msg)
          this.showCarousel = true
        } else {
          Message.error(res.msg)
        }
      } catch (error) {
        // console.error('获取题库信息失败:', error)
        Message.error('获取题库信息失败')
      }
    },
    openpage(index) {
      if (this.lockStatus[index - 1] === 1 || index === 0) {
        this.allAnswerToFront(index + 1)
      } else if (this.lockStatus[index - 1] === 0) {
        Message.warning('您还未解锁此题库')
      }
    },
    decryptData(encryptedData, secretKey) {
      console.log('解密前数据', encryptedData)
      try {
        // 解密数据
        const bytes = CryptoJS.AES.decrypt(CryptoJS.enc.Base64.parse(encryptedData), secretKey)
        // 将解密后的字节转换为字符串
        const originalText = bytes.toString(CryptoJS.enc.Utf8)
        return originalText
      } catch (e) {
        // 错误处理
        console.error('解密失败:', e)
        throw e
      }
    },
    // decode(base64Str) {
    //   const utf8Str = CryptoJS.enc.Base64.parse(base64Str)
    //   const secretKey = CryptoJS.enc.Utf8.parse('12345678901234567890123456789012')
    //   // const iv = CryptoJS.enc.Utf8.parse('0000000000000000')
    //   try {
    //     const decryptedBytes = CryptoJS.AES.decrypt(utf8Str, secretKey, {
    //       // iv: iv,
    //       mode: CryptoJS.mode.CBC,
    //       padding: CryptoJS.pad.Pkcs7
    //     })
    //     const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8)
    //     console.log('解密后的数据:', decryptedData) // 检查解密后的数据
    //     return decryptedData
    //   } catch (error) {
    //     console.error('解密失败:', error)
    //     return null
    //   }
    // },
    // decode(encryptedStr = '') {
    //   // 将输入字符串转换为UTF-8格式
    //   const message = encryptedStr

    //   // 定义AES密钥
    //   const secretKey = CryptoJS.enc.Utf8.parse('1234567890123456')

    //   try {
    //     // 使用AES-ECB模式解密
    //     const decryptedMessage = CryptoJS.AES.decrypt(message, secretKey, {
    //       mode: CryptoJS.mode.ECB,
    //       padding: CryptoJS.pad.Pkcs7
    //     })

    //     // 将解密后的WordArray转换为UTF-8字符串
    //     return decryptedMessage.toString(CryptoJS.enc.Utf8)
    //   } catch (error) {
    //     // 错误处理
    //     console.error('解密失败:', error)
    //     return null
    //   }
    // },
    // decode(str = '') {
    //   try {
    //     // 确保密钥和 IV 的长度正确
    //     const secretKey = CryptoJS.enc.Utf8.parse('12345678901234567890123456789012')
    //     const iv = CryptoJS.enc.Utf8.parse('0000000000000000') // 16 字节长度

    //     // 使用 CryptoJS 解密
    //     const decryptedBytes = CryptoJS.AES.decrypt(str, secretKey, {
    //       iv: iv,
    //       mode: CryptoJS.mode.CBC,
    //       padding: CryptoJS.pad.Pkcs7
    //     })

    //     // 将解密后的 WordArray 转换为 UTF-8 编码的字符串
    //     const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8)

    //     // 返回解密后的字符串
    //     return decryptedData
    //   } catch (error) {
    //     console.error('解密失败:', error)
    //     // 处理解密错误，例如返回 null 或错误消息
    //     return null
    //   }
    // },
    async allAnswerToFront(setId) {
      await allAnswerToFront(setId).then(res => {
        // this.$router.push({
        //   path: '/question',
        //   query: {
        //     questions: this.decode(res.data)
        //   }
        // })
        // const content = this.decode(res.data)
        const secretKey = '12345678901234567890123456789012'
        // console.log('解密前的数据：', res.data)
        console.log('解密后的数据：', this.decryptData(res.data, secretKey))
      })
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

.bgd {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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

.el-carousel__item {
  background-image: url(../../assets/imgss/war.webp);
  background-position: center center;
  background-size: cover;
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
.locked {
  position: relative;
  cursor: not-allowed;
}
.locked-text {
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  color: rgb(0, 0, 0);
}
</style>
