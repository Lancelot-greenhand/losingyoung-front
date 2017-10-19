<template>
    <div class="l-side-menu" :style="{top: top, left: left? 0: 'auto', right: left? 'auto': 0}">
      <slot name="header"></slot>
      <menu-items :menuItems="menuItems"></menu-items>
      <slot name="footer"></slot>
    </div>
</template>
<script>
  import MenuItems from './MenuItems'
  export default {
    name: 'small-side-menu',
    components: {
      MenuItems
    },
    props: {
      top: {
        type: String,
        default: '0'
      },
      left: {
        type: Boolean,
        default: true
      },
      menuItems: {
        type: Array
      }
    },
    data () {
      return {
      }
    }
  }
</script>
<style>
  .l-side-menu{
    position: fixed;
    background-color: #f9f9f9;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    width: 15rem;
    box-sizing: border-box;
    height: 100%;
    padding: 50px 20px 10px 10px;
  }
</style>
