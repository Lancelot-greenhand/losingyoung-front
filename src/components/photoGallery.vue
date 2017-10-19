<template>
    <div class="img-group">
 <!--      <div v-for="item in items" class="img-wrapper">
        <img class="img-item" :src="item.href"/>
      </div> -->
      <waterfall :line-gap="350" :watch="items">
        <!-- each component is wrapped by a waterfall slot -->
        <waterfall-slot
          v-for="(item, index) in items"
          :width="item.width"
          :height="item.height"
          :order="index"
          :key="item.id"
        >
        <img class='img-item' :src="item.href"/>
        <!--
          your component
        -->
        </waterfall-slot>
      </waterfall>
    </div>
</template>
<script>
  import Waterfall from '@/components/WaterFall/waterFall.vue'
  import WaterfallSlot from '@/components/WaterFall/waterfallSlot.vue'
  import {getImageItem} from '@/service/getData.js'
  import {config} from '@/config/index.js'
  var baseUrl = config.baseUrl
  export default {
    components: {
      Waterfall,
      WaterfallSlot
    },
    data () {
      return {
        items: []
      }
    },
    computed: {
      id () {
        return this.$route.params.list_id
      }
    },
    // created () {
    //   this.items = mockData.map((value, idx) => {
    //     value.id = idx
    //     // value.height = 400 * Math.random()
    //     value.width = 300
    //     return value
    //   })
    // },
    mounted () {
      let listId = this.$route.params.list_id
      getImageItem({
        listId,
        pageNum: 1,
        pageSize: 20
      }).then(response => {
        let resData = response.data
        this.items = resData.map((value) => {
          value.href = baseUrl + value.src
          let ratio = value.width / 300
          value.width = 300
          value.height = value.height / ratio
          return value
        })
      })
    },
    methods: {
      checkScrollBarPos () {
        return false
      }
    }
  }
</script>
<style scoped>
  .img-group{
    padding-top: 10px;
  }
  .img-wrapper{
    float: left;
    clear: right;
  }
  .img-item{
    display: inline-block;
    max-width: 300px;
  }
/*  @media screen and (max-width:750px) {
    .img-group{
      column-width: 18rem;
    }
    .img-item{
      width: 15rem;
    }
  }*/
</style>
