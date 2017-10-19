<template>
  <div>
    <l-header class='l-header'></l-header>
      <div class='l-body'>
        <router-view></router-view>
      </div>
  </div>
</template>
<script>
  import LHeader from '@/components/Header'
  export default {
    data () {
      return {
      }
    },
    components: {
      LHeader
    }
  }
</script>
<style scoped>
  .l-body{
    margin-top: 8.5rem;
    padding:0 20% 5%;
  }
  @media screen and (max-width: 1200px){
    .l-body{
      padding:0 12%;
    }
  }
  @media screen and (max-width: 750px){
    .l-body{
      margin-top: 4.5rem;
      padding:0 5% 3%;
    }
  }
</style>

