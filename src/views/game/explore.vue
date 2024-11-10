<template>
  <div class="game-container">
    <div class="content-wrapper" :style="{ backgroundImage: `url(${currentScene.backgroundImage})` }">
      <!-- <h1>侨批的故事：跨越海洋的家书</h1> -->
      <div class="story-content">
        <p>{{ displayedText }}</p>
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
      displayedText: '',
      showChoices: false,
      gameOver: false,
      scenes: {
        start: {
          text: '1935年，你是一名来自潮汕地区的年轻人。家中生活困难，你决定出洋谋生。临行前，祖父交给你一封神秘的家书。',
          choices: [
            { text: '立即打开家书', next: 'openLetter' },
            { text: '将家书收好，准备启程', next: 'prepareJourney' }
          ],
          backgroundImage: require('../../assets/imgs/explore1.png')
        },
        openLetter: {
          text: '你打开家书，里面不仅有家人的叮嘱，还有一张古老的地图和一个神秘的地址。祖父在信中提到，这可能与家族的秘密有关。',
          choices: [
            { text: '决定探索地图所指的地点', next: 'exploreMap' },
            { text: '忽略地图，专注于出国工作', next: 'focusOnWork' }
          ],
          backgroundImage: require('../../assets/imgs/explore2.png')
        },
        prepareJourney: {
          text: '你小心地将家书收好，开始准备行装。在码头等待船只时，你遇到了一位同样准备出国的老乡。',
          choices: [
            { text: '与老乡攀谈，询问他的经历', next: 'talkToFellow' },
            { text: '保持沉默，独自思考未来', next: 'silentThoughts' }
          ],
          backgroundImage: '/placeholder.svg?height=1080&width=1920'
        },
        exploreMap: {
          text: '你按照地图的指示，来到了一个隐蔽的老宅。这里似乎是昔日侨批局的所在地。你在墙上发现了一些神秘的符号。',
          choices: [
            { text: '尝试解读墙上的符号', next: 'decodeSymbols' },
            { text: '在老宅中寻找更多线索', next: 'searchHouse' }
          ],
          backgroundImage: '/placeholder.svg?height=1080&width=1920'
        },
        focusOnWork: {
          text: '你决定专注于出国工作。几个月后，你在南洋的一家橡胶园找到了工作。艰苦的生活中，写家书成为你唯一的慰藉。',
          choices: [
            { text: '努力工作，寄钱回家', next: 'sendMoneyHome' },
            { text: '寻找更好的机会', next: 'seekBetterOpportunity' }
          ],
          backgroundImage: '/placeholder.svg?height=1080&width=1920'
        },
        talkToFellow: {
          text: '老乡告诉你，他已经在南洋工作多年，这次回乡是为了处理一些侨批相关的事务。他提到侨批不仅是汇款的工具，更承载着重要的信息。',
          choices: [
            { text: '询问更多关于侨批的信息', next: 'learnAboutQiaopi' },
            { text: '请教如何在异国生存', next: 'survivalTips' }
          ],
          backgroundImage: '/placeholder.svg?height=1080&width=1920'
        },
        silentThoughts: {
          text: '独自思考中，你回忆起祖父曾经提到过家族与侨批有着深厚的渊源。你开始怀疑，自己的这次出行是否会揭开一些尘封的秘密。',
          choices: [
            { text: '决定深入了解家族历史', next: 'exploreHistory' },
            { text: '将疑虑抛之脑后，专注未来', next: 'focusOnFuture' }
          ],
          backgroundImage: '/placeholder.svg?height=1080&width=1920'
        },
        decodeSymbols: {
          text: '经过仔细研究，你发现这些符号是一种特殊的密码，用于保护侨批的内容。你成功破译了一条信息，揭示了一个惊人的家族秘密。',
          choices: [
            { text: '继续深入调查', next: 'deeperInvestigation' },
            { text: '将发现告诉家人', next: 'informFamily' }
          ],
          backgroundImage: '/placeholder.svg?height=1080&width=1920'
        },
        searchHouse: {
          text: '在老宅的暗格中，你发现了一叠尘封已久的侨批。这些信件记录了几代人的辛酸历史，以及他们为家乡发展所做的贡献。',
          choices: [
            { text: '仔细阅读这些侨批', next: 'readQiaopi' },
            { text: '将侨批带走，留作纪念', next: 'takeQiaopi' }
          ],
          backgroundImage: '/placeholder.svg?height=1080&width=1920'
        },
        sendMoneyHome: {
          text: '你辛勤工作，定期通过侨批将钱寄回家。多年后，你不仅改善了家庭生活，还为家乡的发展做出了重要贡献。',
          choices: [
            { text: '继续在海外发展事业', next: 'expandBusiness' },
            { text: '考虑回乡发展', next: 'returnHome' }
          ],
          backgroundImage: '/placeholder.svg?height=1080&width=1920'
        },
        seekBetterOpportunity: {
          text: '你决定寻找更好的机会。在漂泊中，你结识了许多来自不同地方的华侨，并开始参与侨批网络的建设，成为连接海外华人的重要纽带。',
          choices: [
            { text: '深入侨批网络', next: 'deepenNetwork' },
            { text: '开拓新的商业机会', next: 'newBusiness' }
          ],
          backgroundImage: '/placeholder.svg?height=1080&width=1920'
        },
        learnAboutQiaopi: {
          text: '通过与老乡的交谈，你深入了解了侨批的重要性。你决定投身于侨批事业，后来成为了一名受人尊敬的批信局经营者，连接着千万游子与他们的家乡。',
          choices: [
            { text: '扩大批信局的业务', next: 'expandQiaopiService' },
            { text: '记录侨批历史', next: 'documentQiaopiHistory' }
          ],
          backgroundImage: '/placeholder.svg?height=1080&width=1920'
        },
        survivalTips: {
          text: '老乡给了你许多宝贵的建议。在异国的岁月里，你不仅成功地适应了新环境，还通过侨批网络帮助了许多新来乍到的同乡。',
          choices: [
            { text: '组织华人互助会', next: 'organizeAssociation' },
            { text: '专注个人事业发展', next: 'focusCareer' }
          ],
          backgroundImage: '/placeholder.svg?height=1080&width=1920'
        },
        exploreHistory: {
          text: '你深入研究家族历史，发现祖辈们在侨批业务中扮演了重要角色。你决定继承这一传统，成为新一代的侨批传承者，为海外华人服务。',
          choices: [
            { text: '现代化侨批服务', next: 'modernizeQiaopi' },
            { text: '保护传统侨批文化', next: 'preserveQiaopiCulture' }
          ],
          backgroundImage: '/placeholder.svg?height=1080&width=1920'
        },
        focusOnFuture: {
          text: '你决定专注于未来。多年后，当你功成名就，你重新审视自己的根源，开始致力于保护和推广侨批文化，让这段历史不被遗忘。',
          choices: [
            { text: '建立侨批博物馆', next: 'establishMuseum' },
            { text: '编写侨批历史书籍', next: 'writeBook' }
          ],
          backgroundImage: '/placeholder.svg?height=1080&width=1920'
        },
        deeperInvestigation: {
          text: '你决定继续深入调查。通过解读更多的密码，你逐渐揭开了一个跨越几代人的家族秘密。这个秘密不仅关乎你的家族，还涉及到整个侨批网络的形成。',
          choices: [
            { text: '将发现公之于众', next: 'revealSecret' },
            { text: '秘密保护这份历史', next: 'protectSecret' }
          ],
          backgroundImage: '/placeholder.svg?height=1080&width=1920'
        },
        informFamily: {
          text: '你决定将发现告诉家人。家人听后既惊讶又感动，他们决定集体商议如何处理这个家族秘密。',
          choices: [
            { text: '支持家人公开秘密', next: 'supportDisclosure' },
            { text: '建议保守这个秘密', next: 'keepFamilySecret' }
          ],
          backgroundImage: '/placeholder.svg?height=1080&width=1920'
        },
        readQiaopi: {
          text: '你仔细阅读这些侨批，从中了解到了许多海外华人的艰辛故事和他们对家乡的深厚感情。这些信件让你对侨批的重要性有了更深的认识。',
          choices: [
            { text: '整理并保存这些侨批', next: 'preserveLetters' },
            { text: '寻找信件中提到的人', next: 'findPeople' }
          ],
          backgroundImage: '/placeholder.svg?height=1080&width=1920'
        },
        takeQiaopi: {
          text: '你决定将这些侨批带走，作为珍贵的历史纪念。这些信件成为你日后研究侨批文化的重要资料，也成为你与家族历史联系的纽带。',
          choices: [
            { text: '开始研究侨批历史', next: 'researchHistory' },
            { text: '将侨批作为家族传承', next: 'familyHeirloom' }
          ],
          backgroundImage: '/placeholder.svg?height=1080&width=1920'
        },
        expandBusiness: {
          text: '你决定继续在海外发展事业。凭借多年积累的经验和人脉，你的事业蒸蒸日上，成为了当地华人社区的领袖。',
          choices: [
            { text: '投资侨批相关产业', next: 'investQiaopi' },
            { text: '促进中外文化交流', next: 'culturalExchange' }
          ],
          backgroundImage: '/placeholder.svg?height=1080&width=1920'
        },
        returnHome: {
          text: '经过深思熟虑，你决定回到家乡发展。你带回了海外的经验和资金，为家乡的现代化建设做出了重要贡献。',
          choices: [
            { text: '创办侨批主题的企业', next: 'startQiaopiCompany' },
            { text: '参与地方政务建设', next: 'localGovernment' }
          ],
          backgroundImage: '/placeholder.svg?height=1080&width=1920'
        },
        deepenNetwork: {
          text: '你深入参与侨批网络的建设，成为了连接世界各地华人的重要纽带。你的工作不仅便利了海外华人的生活，还促进了国际间的文化交流。',
          choices: [
            { text: '推动侨批数字化', next: 'digitalizeQiaopi' },
            { text: '组织国际侨批研讨会', next: 'internationalConference' }
          ],
          backgroundImage: '/placeholder.svg?height=1080&width=1920'
        },
        newBusiness: {
          text: '你抓住机遇，开拓了新的商业领域。你的事业不仅为你带来了财富，还为当地创造了大量就业机会，赢得了社会的尊重。',
          choices: [
            { text: '将事业与侨批文化结合', next: 'integrateCulture' },
            { text: '成立慈善基金会', next: 'establishFoundation' }
          ],
          backgroundImage: '/placeholder.svg?height=1080&width=1920'
        },
        expandQiaopiService: {
          text: '你努力扩大批信局的业务，引入新技术提高服务效率。你的批信局成为了连接海内外的重要桥梁，赢得了广大侨胞的信赖。',
          choices: [
            { text: '开发侨批APP', next: 'developApp' },
            { text: '与国际金融机构合作', next: 'internationalCooperation' }
          ],
          backgroundImage: '/placeholder.svg?height=1080&width=1920'
        },
        documentQiaopiHistory: {
          text: '你开始系统地记录侨批的历史。通过采访老一辈侨胞，收集历史文献，你编纂了一部详尽的侨批发展史，为保护这份文化遗产做出了重要贡献。',
          choices: [
            { text: '出版侨批历史书籍', next: 'publishBook' },
            { text: '制作侨批纪录片', next: 'produceDocumentary' }
          ],
          backgroundImage: '/placeholder.svg?height=1080&width=1920'
        },
        organizeAssociation: {
          text: '你组织了一个华人互助会，为新到的同胞提供帮助和指导。这个组织逐渐发展成为当地最具影响力的华人社团之一。',
          choices: [
            { text: '扩大协会规模', next: 'expandAssociation' },
            { text: '与其他族裔团体合作', next: 'collaborateOtherGroups' }
          ],
          backgroundImage: '/placeholder.svg?height=1080&width=1920'
        },
        focusCareer: {
          text: '你专注于个人事业的发展，凭借勤奋和智慧，很快在异国他乡站稳了脚跟。你的成功故事激励了许多后来的华人移民。',
          choices: [
            { text: 'mentor年轻一代', next: 'mentorYouth' },
            { text: '投资新兴产业', next: 'investNewIndustries' }
          ],
          backgroundImage: '/placeholder.svg?height=1080&width=1920'
        },
        modernizeQiaopi: {
          text: '你致力于将侨批服务现代化，引入电子支付和在线通信系统。你的创新大大提高了侨批服务的效率，使这一传统在新时代焕发生机。',
          choices: [
            { text: '开发跨国电子钱包', next: 'developEWallet' },
            { text: '创立在线侨批博物馆', next: 'onlineMuseum' }
          ],
          backgroundImage: '/placeholder.svg?height=1080&width=1920'
        },
        preserveQiaopiCulture: {
          text: '你致力于保护传统侨批文化，收集和修复古老的侨批文书，举办展览来展示侨批的历史价值。你的努力引起了社会各界的广泛关注。',
          choices: [
            { text: '申请世界文化遗产', next: 'applyWorldHeritage' },
            { text: '开设侨批文化课程', next: 'teachQiaopiCulture' }
          ],
          backgroundImage: '/placeholder.svg?height=1080&width=1920'
        },
        establishMuseum: {
          text: '你决定建立一座侨批博物馆，展示侨批的历史和文化价值。这座博物馆成为了重要的文化地标，吸引了众多游客和研究者。',
          choices: [
            { text: '举办国际巡展', next: 'internationalExhibition' },
            { text: '开发教育项目', next: 'educationalPrograms' }
          ],
          backgroundImage: '/placeholder.svg?height=1080&width=1920'
        },
        writeBook: {
          text: '你开始编写一本关于侨批历史的书籍。通过大量的研究和采访，你的书不仅记录了侨批的发展，还展现了海外华人的生活状况和心路历程。',
          choices: [
            { text: '将书籍改编成电影', next: 'adaptMovie' },
            { text: '举办全球读书会', next: 'globalBookClub' }
          ],
          backgroundImage: '/placeholder.svg?height=1080&width=1920'
        },
        revealSecret: {
          text: '你决定将发现公之于众。这个秘密的揭露引起了巨大的轰动，不仅改变了人们对侨批历史的认知，还促进了相关领域的学术研究。',
          choices: [],
          backgroundImage: '/placeholder.svg?height=1080&width=1920'
        },
        protectSecret: {
          text: '你选择秘密保护这份历史。你成立了一个秘密组织，致力于保护和传承这个重要的历史遗产，确保它不会因时间的流逝而消失。',
          choices: [],
          backgroundImage: '/placeholder.svg?height=1080&width=1920'
        },
        supportDisclosure: {
          text: '在你的支持下，家人决定公开这个秘密。这个决定让你们家族成为了侨批研究领域的重要对象，也为侨批历史研究提供了宝贵的资料。',
          choices: [],
          backgroundImage: '/placeholder.svg?height=1080&width=1920'
        },
        keepFamilySecret: {
          text: '遵循你的建议，家人决定保守这个秘密。这个决定让你们家族在默默中继续守护着这份珍贵的历史，成为侨批文化的无名守护者。',
          choices: [],
          backgroundImage: '/placeholder.svg?height=1080&width=1920'
        },
        preserveLetters: {
          text: '你精心整理并保存了这些侨批，它们成为了珍贵的历史档案。多年后，这些信件成为了研究早期华人移民史的重要资料，你的贡献得到了学术界的高度认可。',
          choices: [],
          backgroundImage: '/placeholder.svg?height=1080&width=1920'
        },
        findPeople: {
          text: '你开始寻找信件中提到的人。这段旅程让你结识了许多有趣的人，听到了无数感人的故事。你的努力不仅连接了失散多年的家庭，还为侨批研究提供了宝贵的口述历史资料。',
          choices: [],
          backgroundImage: '/placeholder.svg?height=1080&width=1920'
        },
        researchHistory: {
          text: '你开始深入研究侨批历史。你的研究成果填补了这一领域的多个学术空白，你成为了备受尊敬的侨批历史专家，经常被邀请到各地进行学术交流。',
          choices: [],
          backgroundImage: '/placeholder.svg?height=1080&width=1920'
        },
        familyHeirloom: {
          text: '你将这些侨批作为家族传承，世代相传。这些信件不仅成为了你家族的珍贵回忆，也成为了连接后代与先祖的重要纽带，让家族历史永远流传。',
          choices: [],
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
      this.displayedText = ''
      this.showChoices = false
      this.typeText()
    },
    restartGame() {
      this.currentSceneId = 'start'
      this.displayedText = ''
      this.showChoices = false
      this.gameOver = false
      this.typeText()
    },
    typeText() {
      const text = this.currentScene.text
      let index = 0
      const timer = setInterval(() => {
        if (index < text.length) {
          this.displayedText += text[index]
          index++
        } else {
          clearInterval(timer)
          this.showChoices = true
          if (this.currentScene.choices.length === 0) {
            this.gameOver = true
          }
        }
      }, 50) // 每50毫秒添加一个字符
    }
  },
  mounted() {
    this.typeText()
  }
}
</script>

<style scoped>
.game-container {
  /* position: fixed;
  top: 0;
  left: 0; */
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'SimSun', 'STSong', serif;
}

.content-wrapper {
  position: relative;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-radius: 10px;
  /* max-width: 600px; */
  width: 90%;
  height: 685px;
  margin: 20px;
  /* background-image:url('../../assets/imgs/explore1.png'); */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* h1 {
  color: #8B4513;
  text-align: center;
  margin-bottom: 20px;
} */

.story-content {
  position: absolute;
  left: 50%;
  bottom: 20px;
  transform: translateX(-50%);
  width: 60%;
  background-color: rgba(255, 255, 255, 0.6);
  border: 1px solid #8B4513;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 20px;
  min-height: 100px;
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
.restart-button{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.choice-button:hover, .restart-button:hover {
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
