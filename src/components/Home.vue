<template>
  <div class="home">
      <el-button type="info" round @click="quitClick">退出</el-button>
  </div>
</template>

<script>
export default {
    methods:{
        quitClick(){
            this.$router.push('/login')
            window.sessionStorage.clear()
            
        }
    }
}
</script>

<style>

</style>