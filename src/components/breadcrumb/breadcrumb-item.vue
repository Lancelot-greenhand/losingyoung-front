<template>
  <div>
    <span :class='{curItem: isCurItem}' class="l-breadcrumb-item">
      <a @click='goTo(to)' v-if='hasHref && !isCurItem'>
        <slot></slot>
      </a>
      <slot v-else></slot>
    </span>
    <span v-if="!isCurItem" >{{separator}}</span>
  </div>
</template>
<script>
  export default {
    props: {
      to: {
        type: String,
        default: ''
      },
      curItem: {
        type: [String, Boolean],
        default: 'false'
      }
    },
    data () {
      return {
        separator: ''
      }
    },
    computed: {
      isCurItem () {
        if (this.curItem === 'false' || this.curItem === false) {
          return false
        }
        return true
      },
      hasHref () {
        return this.to.length > 0
      }
    },
    mounted () {
      this.separator = this.$parent.separator
    },
    methods: {
      goTo(url) {
        this.$router.push(url)
      }
    }
  }
</script>
<style>
  .curItem{
    font-weight: bold;
  }
  .l-breadcrumb-item{
    display: inline-block;
    padding: 5px;
  }
</style>
