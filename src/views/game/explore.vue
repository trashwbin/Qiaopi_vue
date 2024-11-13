<template>
  <div class="game-container">
    <div class="content-wrapper" :style="{ backgroundImage: `url(${currentScene.backgroundImage})` }">
      <div class="story-content">
        <p>
          <span
            v-for="(char, index) in currentScene.text"
            :key="index"
            :class="{ 'visible': index < displayedTextLength }"
          >{{ char }}</span>
        </p>
      </div>
      <div class="choices" v-if="showChoices">
        <button
          v-for="(choice, index) in currentScene.choices"
          :key="index"
          @click="makeChoice(choice.next)"
          class="choice-button"
        >
          {{ choice.text }}
        </button>
      </div>
      <button v-if="!showChoices && !gameOver" @click="nextScene" class="next-button">下一段</button>
      <button v-if="gameOver" @click="restartGame" class="restart-button">重新开始</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QiaopiStoryGame',
  data() {
    return {
      currentSceneId: 'start',
      displayedTextLength: 0,
      showChoices: false,
      gameOver: false,
      scenes: {
        start: {
          text: '梦梅的家乡有一口废弃的井，因为曾有人投井自杀而被封闭。他小时候常偷看井里想象着井下的神秘世界，甚至幻想井是通往大海和外部世界的窗户。银溪村靠近韩江，村民们通过韩江出海去往远方，被称为"番客"。梦梅的家族，溪前，曾经显赫一时，但现在已经衰落，与溪后的家族关系疏远。',
          next: 'familyHistory',
          backgroundImage: require('../../assets/imgs/explore1.png')
        },
        familyHistory: {
          text: '梦梅的曾祖父郑鸿顺(九爷)在马六甲发了财，与堂兄弟郑鸿利一起在银溪村建了两座大宅，时光里和平安里，分别代表溪前和溪后。溪前家族多才情，但人丁不旺，而溪后家族则务实且人丁兴旺。梦梅的祖父郑集炎和另一位溪前家族成员在同一天被人放火烧死，这使得溪前家族进一步衰落。',
          next: 'fatherStory',
          backgroundImage: require('../../assets/imgs/explore2.png')
        },
        fatherStory: {
          text: '梦梅的父亲阿女，名字女性化，是因为家族希望他能长寿。阿女有三好:好茶、好客、好石，但这些爱好都需要金钱维持。梦梅的哥哥梦龙(复生)曾有机会重振家声，他留学日本，加入同盟会，参与革命，但最终在一次刺杀行动中牺牲。',
          next: 'mengmeiStory',
          backgroundImage: '/placeholder.svg?height=1080&width=1920'
        },
        mengmeiStory: {
          text: '梦梅自己则被家族的期望和历史的重负所困扰。他有四个儿子，但其中一个被交换给了溪后家族，另一个则被过继给了已故的哥哥。梦梅的生活充满了矛盾和挣扎，他既想继承家族的传统，又想摆脱过去的阴影。他被老祖(他的祖母)寄予厚望，希望他能重振家族，但梦梅自己却感到迷茫和无力。',
          next: 'decision',
          backgroundImage: '/placeholder.svg?height=1080&width=1920'
        },
        decision: {
          text: '故事中还提到了梦梅对井的神秘感和对外部世界的向往，他想象着通过并可以到达大海，甚至更远的地方。随着故事的发展，梦梅决定离开家乡，下南洋，去寻找家族的秘密和自己的未来。他计划找到番客(他的叔公，一位诗人)的文集，以及查明两位阿公的真正死因。',
          choices: [
            { text: '决定离开家乡，下南洋', next: 'leaveHome' },
            { text: '留在家乡，尝试重振家族', next: 'stayHome' }
          ],
          backgroundImage: '/placeholder.svg?height=1080&width=1920'
        },
        leaveHome: {
          text: '梦梅决定离开家乡，下南洋，去寻找家族的秘密和自己的未来。他计划找到番客(他的叔公，一位诗人)的文集，以及查明两位阿公的真正死因。带着对未知的期待和对家乡的眷恋，梦梅踏上了他的旅程。',
          next: 'ending',
          backgroundImage: '/placeholder.svg?height=1080&width=1920'
        },
        stayHome: {
          text: '梦梅决定留在家乡，尝试重振家族。他开始深入研究家族的历史，寻找可能被遗忘的资源和机会。虽然道路艰辛，但梦梅坚信，只有了解过去，才能更好地面对未来。',
          next: 'ending',
          backgroundImage: '/placeholder.svg?height=1080&width=1920'
        },
        ending: {
          text: '无论梦梅选择何种道路，他的故事都将成为侨批历史的一部分。这个故事不仅是关于一个人的命运，更是关于一个时代的变迁，以及人们如何在变革中寻找自己的位置。',
          choices: [
            { text: '重新开始', next: 'start' }
          ],
          backgroundImage: '/placeholder.svg?height=1080&width=1920'
        }
      }
    }
  },
  computed: {
    currentScene() {
      return this.scenes[this.currentSceneId]
    }
  },
  methods: {
    makeChoice(nextSceneId) {
      this.currentSceneId = nextSceneId
      this.displayedTextLength = 0
      this.showChoices = false
      this.typeText()
    },
    restartGame() {
      this.currentSceneId = 'start'
      this.displayedTextLength = 0
      this.showChoices = false
      this.gameOver = false
      this.typeText()
    },
    typeText() {
      const text = this.currentScene.text
      const timer = setInterval(() => {
        if (this.displayedTextLength < text.length) {
          this.displayedTextLength++
        } else {
          clearInterval(timer)
          if (this.currentScene.choices && this.currentScene.choices.length > 0) {
            this.showChoices = true
          }
        }
      }, 50)
    },
    nextScene() {
      if (this.currentScene.next) {
        this.makeChoice(this.currentScene.next)
      } else {
        this.gameOver = true
      }
    }
  },
  mounted() {
    this.typeText()
  }
}
</script>

<style scoped>
@font-face {
    font-family: 'MyFont'; /* 这里定义一个字体名称 */
    src: url('../../assets/fonts/字魂逍遥行书.ttf') format('truetype'); /* 指定字体文件的路径和格式 */
}
.game-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'MyFont', 'STSong', serif;
}

.content-wrapper {
  position: relative;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  height: 685px;
  margin: 20px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.story-content {
  position: absolute;
  left: 50%;
  bottom: 20px;
  transform: translateX(-50%);
  width: 70%;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid #8B4513;
  border-radius: 5px;
  padding: 25px;
  margin-bottom: 20px;
  min-height: 100px;
}
.story-content p {
  text-align: left;
  font-size: 25px;
}

.story-content span {
  opacity: 0;
  transition: opacity 0.1s ease-in-out;
}

.story-content span.visible {
  opacity: 1;
}

.choices {
  position: absolute;
  width: 30%;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.choice-button, .restart-button {
  background-color: #8B4513;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.restart-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}

.choice-button:hover, .restart-button:hover {
  background-color: #A0522D;
}

.next-button {
  position: absolute;
  bottom: 20px;
  right: 280px;
  background-color: #8B4513;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.next-button:hover {
  background-color: #A0522D;
}

@media (max-width: 600px) {
  .content-wrapper {
    width: 95%;
    padding: 15px;
  }
}

@media (max-height: 600px) {
  .game-container {
    align-items: flex-start;
  }
}
</style>
