<template>
  <div id="app">
      <div class="title"><router-view></router-view>
      </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
 .title{
    text-align: center;
    background-image: linear-gradient(to right, #ECEED9, #B38554);
}
</style>
