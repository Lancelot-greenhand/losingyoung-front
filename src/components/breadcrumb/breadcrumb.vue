<template>
  <div class='l-breadcrumb'>
    <slot></slot>
  </div>
</template>
<script>
  export default {
    props: {
      separator: {
        type: String,
        default: '>'
      }
    },
    data () {
      return {
      }
    }
  }
</script>
<style scoped>
  .l-breadcrumb{
    display:flex;
  }
  
</style>
