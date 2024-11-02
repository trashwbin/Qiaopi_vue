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
.title {
  text-align: center;
}

body {
  overflow-x: hidden;
  /* 隐藏水平滚动条 */
  margin: 0;
  padding: 0;
}

/* 更改滚动条默认样式 */
/* 滚动条整体轨道样式 */
::-webkit-scrollbar {
  width: 10px;
}

/* 滚动条滑块样式 */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

/* 滑动轨道按钮 */
::-webkit-scrollbar-button {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-button:start:decrement {
  background-image: url(././assets/imgs/up.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

::-webkit-scrollbar-button:end:increment {
  background-image: url(././assets/imgs/down.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

/* 滚动条滑块悬停样式 */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* 滚动条轨道样式 */
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

/* 滚动条轨道悬停样式 */
::-webkit-scrollbar-track:hover {
  background: #e1e1e1;
}
</style>
