<template>
  <div>
   <transition name="slide">
     <small-side-menu v-show='show' :left='false' :menuItems="items"></small-side-menu>
   </transition>
  </div>
</template>
<script>
  import SmallSideMenu from './SideMenu/index'
  export default {
    components: {
      SmallSideMenu
    },
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        items: [{
          title: '分类',
          href: '',
          children: [{
            title: '技术',
            href: '/index/resources'
          }, {
            title: '随笔',
            href: '/index/bullshit'
          }]
        }, {
          title: '其乐融融',
          href: '',
          children: [{
            title: '我们',
            href: '/photos'
          }]
        }]
      }
    }
  }
</script>
<style>
  .slide-enter-active, .slide-leave-active{
    transition:all 0.4s ease-in;
  }
  .slide-enter, .slide-leave-to{
    transform: translateX(260px);
    /*opacity: 0;*/

  }

</style>
