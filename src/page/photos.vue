<template>
	<div>
    <l-header class='l-header'></l-header>
    <div class="l-body">
      <div class='breadcrumb-photo'>
        <l-breadcrumb >
          <l-breadcrumb-item v-for="item in breadItems" 
            :to='item.to' 
            :curItem='item.curItem' 
            :key="item.title">{{item.title}}
          </l-breadcrumb-item>
        </l-breadcrumb>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  import LHeader from '@/components/Header.vue'
  import lBreadcrumb from '@/components/breadcrumb/breadcrumb'
  import lBreadcrumbItem from '@/components/breadcrumb/breadcrumb-item'
  export default {
    components: {
      LHeader,
      lBreadcrumb,
      lBreadcrumbItem
    },
    data () {
      return {
        firstBreadItem: {
          title: '我们',
          to: '#/photos',   // bread改成history api {path: '/ddd'}
          curItem: true
        },
        breadItems: []
      }
    },
    created () {
      this.breadItems.push(this.firstBreadItem)
      this.$store.commit('changeActiveNav', 'photos')
      this.updateBreadItem()
    },
    beforeRouteUpdate (to, from, next) {
      if (to.name === 'photoGallery') {
        let listId = to.params.list_id
        let path = to.path
        this.toGallery(listId, path)
      } else if (to.name === 'photoList') {
        this.toList()
      }
      next()
    },
    methods: {
      toGallery (listId, path) {
        this.breadItems = this.breadItems.slice(0, 1)
        this.firstBreadItem.curItem = false
        this.breadItems.push({
          title: listId,
          to: `#${path}`,
          curItem: true
        })
      },
      toList () {
        this.breadItems = this.breadItems.slice(0, 1)
        this.firstBreadItem.curItem = true
      },
      updateBreadItem () {
        if (this.$route.name === 'photoGallery') {
          console.log(this.$route)
          let listId = this.$route.params.list_id
          let path = this.$route.path
          this.toGallery(listId, path)
        }
      }
    }
  }
</script>
<style scoped>
  .l-body{
    margin-top: 8.5rem;
    padding-bottom: 5%;
  }
  .breadcrumb-photo{
    padding:30px 0 10px 30px;
    font-size: 1.4rem;
  }
  @media screen and (max-width: 1200px){

  }
  @media screen and (max-width: 750px){
    .l-body{
      margin-top: 4.5rem;
      padding-bottom:3%;
    }
    .breadcrumb-photo{
      padding-top:10px;
    }
  }
</style>
<style>
  .l-breadcrumb-item a:hover{
    font-weight:bold;
  }
</style>
