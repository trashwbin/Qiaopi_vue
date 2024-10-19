<template>
  <div class="banner">
    <img src="../../assets/imgs/thinking.png" alt="" class="bgd">
    <!-- 显示当前问题 -->
    <div v-if="currentQuestionIndex < questions.length" class="question">
      <h2>{{ questions[currentQuestionIndex].content }}</h2>
      <!-- 显示问题选项 -->
<!-- 显示问题选项 -->
<div v-for="(option, index) in getOptions(currentQuestionIndex)" :key="index" class="option">
  <label>
    <input type="radio" :value="getOptionLabel(index)" :name="'question-' + questions[currentQuestionIndex].id" v-model="selectedOptions[currentQuestionIndex]">
    {{ getOptionLabel(index) }}、{{ option }}
  </label>
</div>
      <!-- 上一题按钮 -->
      <button @click="priorQuestion" class="button1">上一题</button>
      <!-- 下一题按钮 -->
      <button @click="nextQuestion" class="button2">下一题</button>
    </div>
    <!-- 没有更多问题时显示的信息 -->
    <div v-else class="end">
      <h2>没有更多问题了</h2>
      <button @click="submitAnswers" class="submit-button">提交答案</button>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import { submitAnswers } from '@/api/know'
// import useUserStore from '@/store/modules/user'
export default {
  name: 'questionPage',
  data() {
    return {
      questions: [],
      currentQuestionIndex: 0, // 当前问题的索引
      selectedOptions: [] // 存储每个问题选择的答案
    }
  },
  created() {
    this.fetchQuestions()
  },
  methods: {
    fetchQuestions() {
      // 获取传递的问题数据
      const questionsJson = this.$route.query.questions
      if (questionsJson) {
        // 将字符串转换回 JSON 对象
        this.questions = JSON.parse(questionsJson)
        this.selectedOptions = new Array(this.questions.length).fill(null)
      }
    },
    nextQuestion() {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex += 1
      } else {
        MessageBox.confirm('这是最后一题，是否提交答案？', '确认提交', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.submitAnswers()
        }).catch(() => {
          // 用户点击取消按钮
          console.log('用户取消了提交答案')
        })
      }
    },
    priorQuestion() {
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex -= 1
      } else {
        Message.warning('这是第一题哦！')
      }
    },
    getOptions(index) {
      const question = this.questions[index]
      const options = {
        A: question.optionA,
        B: question.optionB,
        C: question.optionC,
        D: question.optionD
      }
      return Object.values(options)
    },
    getOptionLabel(index) {
      const labels = ['A', 'B', 'C', 'D']
      return labels[index]
    },
    async submitAnswers() {
      // 验证是否有未选择的选项
      const hasUnselected = this.selectedOptions.some(option => option === null)
      if (hasUnselected) {
        Message.warning('请确保所有问题都已选择答案！')
        return
      }
      // const userStore = useUserStore()
      // const token = userStore.token // 从 Pinia store 获取 token
      // 构建提交的数据
      const answers = this.questions.map((question, index) => ({
        questionId: question.id,
        questionContent: question.content,
        selectedOption: this.selectedOptions[index] || '未选择'
      }))
      try {
        const response = await submitAnswers(answers)
        Message.success('答案提交成功！')
        this.handleResponse(response.data)
      } catch (error) {
        console.error('提交答案失败:', error)
        Message.error('提交答案失败')
      }
    },
    handleResponse(data) {
      // 处理返回的数据，显示每题是否选对以及正确的答案和解析
      this.questions.forEach((question, index) => {
        const answerVO = data.questionAnswerVOs[index]
        question.correctAnswer = answerVO.correctAnswer
        question.userAnswer = answerVO.userAnswer
        question.explanation = answerVO.explanation
        question.correct = answerVO.correct
      })
      // 可以在这里添加更多的逻辑来显示结果
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
.question {
  position: absolute;
  top: 50%;
  left: 40%;
  transform: translate(-50%, -50%);
  z-index: 10;
  font-size: 14px;
  margin-bottom: 0px;
}
.question h2 {
  margin:0px;
}
.button1 {
  position: absolute;
  top: 300px;
  left: 0;
  width: 80px;
  height: 30px;
  border-radius: 25px;
  border: 0;
  margin-left: 10px;
  background-color: #aa8b73;
}
.button2 {
  position: absolute;
  top: 300px;
  left: 120px;
  width: 80px;
  height: 30px;
  border-radius: 25px;
  border: 0;
  margin-left: 10px;
  background-color: #aa8b73;
}
.end {
  text-align: center;
}
.submit-button {
  width: 120px;
  height: 40px;
  margin-top: 20px;
  border-radius: 25px;
  border: 0;
  background-color: #aa8b73;
}
.option {
  font-size: 18px;
  margin-bottom: 2px;
}
.option label {
  display: block;
  text-align: left;
  font-weight: bold;
}
</style>
