
<template>
  <div id="app">
    <router-view v-wechat-title='$route.meta.title' ></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
    html, body {
        width: 100%;
        height: 100%;
        background: #f0f0f0;
        overflow: hidden;
    }
#app {
    height: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
     -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
     text-align: center;
     color: #2c3e50;
     margin-top: 0px;
}
</style>
