<template>
	<div>
    <div class="photo-list-body">
      <div v-for="item in items" class="photo-list-wrapper">
        <a :href="item.href" class="photo-list-link"><img :src="item.coverImg" class="photo-list-img"><span>{{item.title}}</span></a>
      </div>
    </div>
  </div>
</template>
<script>
  var photoListBase = '#/photos/list/'
  import {getImageList} from '@/service/getData.js'
  import {config} from '@/config/index.js'
  export default {
    data () {
      return {
        items: []
      }
    },
    mounted () {
      getImageList().then(response => {
        let resData = response.data
        this.items = resData.map(value => {
          let item = {
            href: photoListBase + value.listName,
            title: value.listName,
            coverImg: `${config.baseUrl}${value.coverImg}`
          }
          return item
        })
      })
    },
    methods: {
    }
  }
</script>
<style scoped>
  .photo-list-body{
    display: flex;
    flex-wrap: wrap;
    padding: 25px;
    padding-top:10px;
  }
  .photo-list-wrapper{
    width: 325px;
    height: 270px;
    padding: 5px;
    margin:0 0 15px 15px;
    background: #eee;
    border-radius: 5px;
    box-shadow: 0 0 3px 3px #ddd inset;
  }
  .photo-list-link{
    display: block;
    height: 100%;
    width: 100%;
    vertical-align: bottom;
  }
  .photo-list-link span{
    display: inline-block;
  }
  .photo-list-img{
    height: calc(100% - 20px);
    border-radius: 3px;
    width: 100%;
  }
/*  @media screen and (max-width: 750px) {
    .photo-list-wrapper{
      width: 286px;
      height:220px;
    }
  }*/
  @media screen and (max-width: 600px) {
    .photo-list-body{
      justify-content: center;
    }
  }
  @media screen and (max-width: 400px) {
    .photo-list-body{
      padding-left:10px;
      padding-right: 10px;
    }
    .photo-list-wrapper{
      margin-left:0;
    }
  }
</style>
