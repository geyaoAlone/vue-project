<template>

 <div  style="font-size:30px;margin-top:100px">    this is a fucking test page <br>{{msg}} </div>
</template>
<script>
export default {
  name: 'demo',
  data () {
    return {
      msg: ''
    }
  },
    mounted(){
    },
    watch: {
        '$route' (to, from) {
            this.msg = to.name;
        }
    },

}

</script>
