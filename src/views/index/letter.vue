<template>
  <div>
    <button @click="openLetterModal">我要写信</button>
    <WriteLetterModal ref="writeLetterModal" />
  </div>
</template>

<script>
import WriteLetterModal from './WriteLetterModal.vue'

export default {
  name: 'IndexLetter',
  components: {
    WriteLetterModal
  },
  methods: {
    openLetterModal() {
      this.$refs.writeLetterModal.openModal()
    }
  }
}
</script>
<style scoped>
  button {
    width: 200px;
    height: 50px;
    margin: 300px auto;
    border-radius: 50px;
    background-color: #8b4d38;
    border: 0px;
    color: white;
  }
</style>
