
<template>
  <div class="memory-game">
    <h1>翻翻乐</h1>
    <div class="game-board">
      <div
        v-for="(card, index) in cards"
        :key="index"
        class="card"
        :class="{ flipped: card.flipped, matched: card.matched }"
        @click="flipCard(index)"
      >
        <div class="card-inner">
          <div class="card-front">?</div>
          <div class="card-back">
            <img :src="card.imageUrl" :alt="'Card ' + (index + 1)" />
          </div>
        </div>
      </div>
    </div>
    <button @click="resetGame" class="reset-button">重置游戏</button>
  </div>
</template>

<script>
export default {
  name: 'MemoryCardGame',
  data() {
    return {
      cards: [],
      flippedCards: [],
      canFlip: true,
      images: [
        '/placeholder.svg?height=100&width=100&text=1',
        '/placeholder.svg?height=100&width=100&text=2',
        '/placeholder.svg?height=100&width=100&text=3',
        '/placeholder.svg?height=100&width=100&text=4',
        '/placeholder.svg?height=100&width=100&text=5',
        '/placeholder.svg?height=100&width=100&text=6',
        '/placeholder.svg?height=100&width=100&text=7',
        '/placeholder.svg?height=100&width=100&text=8'
      ]
    }
  },
  methods: {
    initializeCards() {
      const duplicatedImages = [...this.images, ...this.images]
      this.cards = duplicatedImages
        .sort(() => Math.random() - 0.5)
        .map((imageUrl, index) => ({
          id: index,
          imageUrl,
          flipped: false,
          matched: false
        }))
    },
    flipCard(index) {
      if (!this.canFlip || this.cards[index].flipped || this.cards[index].matched) return

      this.cards[index].flipped = true
      this.flippedCards.push(index)

      if (this.flippedCards.length === 2) {
        this.canFlip = false
        this.checkMatch()
      }
    },
    checkMatch() {
      const [index1, index2] = this.flippedCards
      const card1 = this.cards[index1]
      const card2 = this.cards[index2]

      if (card1.imageUrl === card2.imageUrl) {
        card1.matched = true
        card2.matched = true
        this.flippedCards = []
        this.canFlip = true
      } else {
        setTimeout(() => {
          card1.flipped = false
          card2.flipped = false
          this.flippedCards = []
          this.canFlip = true
        }, 1000)
      }
    },
    resetGame() {
      this.initializeCards()
      this.flippedCards = []
      this.canFlip = true
    }
  },
  created() {
    this.initializeCards()
  }
}
</script>

<style scoped>
.memory-game {
  font-family: Arial, sans-serif;
  text-align: center;
  padding:0 20px;
}

.game-board {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  max-width: 600px;
  margin: 0 auto 20px;
}

.card {
  aspect-ratio: 3/4;
  perspective: 1000px;
  cursor: pointer;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.card.flipped .card-inner {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  border-radius: 8px;
}

.card-front {
  background-color: #b49285;
  color: white;
}

.card-back {
  background-color: #3498db;
  color: white;
  transform: rotateY(180deg);
}

.card.matched .card-back {
  background-color: #2ecc71;
}

.card-back img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.reset-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #a26760;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.reset-button:hover {
  background-color: #c0392b;
}
</style>
