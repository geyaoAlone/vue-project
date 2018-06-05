<template>
 <!--<div id = home class="home" >-->
   <!--I'm home page;-->
 <!--</div>-->
  <div class="main">
    <router-link :to="'login'" class="routref">管理员登录</router-link>
    <router-link :to="'about'" class="routref">去缴费</router-link>

  </div>

</template>
<script>
export default {
  name: 'home',
  data () {
    return {
      msg: 'hello home'
    }
  }
}

</script>

<style scoped>
.routref {
  display: inline-block;
  width: 100px;
  height: 100px;
  border:1px solid lightblue;
  line-height: 100px;
  margin: 0 20px;
  text-decoration: none;
}
</style>
