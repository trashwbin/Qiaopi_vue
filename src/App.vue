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
}
body {
  margin: 0;
  padding: 0;
}
</style>
