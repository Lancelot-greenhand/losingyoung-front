<template>
	<div>
   <h1>{{category}}</h1>
   <hr/>
   <div v-for="(item, idx) in items" class="article-list-item" :key='idx'>
     <h2><a :href="item.href">{{item.title}}</a></h2>
     <div class="article-brief-intro" v-html="item.brief_intro"></div>
     <div><a class="article-read-full" :href="item.href">阅读全文</a></div>
     <div class="article-list-item-metadata">
       <span><i class='el-icon-date'></i>{{item.created_date | formatCreatedDate}}</span>
       <span><i class="fa fa-user"></i>{{item.author}}</span>
       <span>
         <span class='article-tag' v-for='(tag, tagIdx) in item.tagItems' :key='tagIdx'>{{tag}}</span>
       </span>
     </div>
   </div> 
  </div>
</template>
<script>
  import {getArticleList} from '@/service/getData.js'
  import {formatDate, md} from '@/utils/utils.js'
  import {categoryName} from '@/config/index.js'
  export default {
    computed: {
      category () {
        return categoryName[this.$route.name]
      }
    },
    data () {
      return {
        items: []
      }
    },
    created () {
      this.renderArticleList()
      this.$store.commit('changeActiveNav', this.$route.name)
    },
    watch: {
      category () {
        this.renderArticleList()
      }
    },
    methods: {
      renderArticleList () {
        let params = {
          category: this.$route.name
        }
        getArticleList(params).then(response => {
          let resData = response.data
          this.items = resData.items.map(item => {
            item.tagItems = item.tags.split(';')
            item.brief_intro = md.render(item.brief_intro)
            return item
          })
        })
      }
    },
    filters: {
      formatCreatedDate (value) {
        return formatDate(value)
      }
    }
  }
</script>
<style scoped>
  div{
    font-size: 1.6rem;
  }
  .article-list-item{
    background-color: #fff;
    margin-top: 3rem;
    padding: 1rem 4rem;
    min-height:18rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .article-list-item>div{
    margin-bottom: 1rem;
  }
  .article-brief-intro{
    text-align: left;
  }
  .article-read-full{
    display: inline-block;
    border-bottom: 1px solid #20a0ff;
    padding: 0.2rem 0.3rem;
  }
  .article-read-full:hover{
    color:#fff;
    background-color: #20a0ff;
    border-radius: 3px;
  }
  .article-list-item-metadata>span{
    margin-right:2rem;
  }
  .article-list-item-metadata i{
    margin-right: 0.2rem;
  }
  .article-tag{
    display: inline-block;
    background-color: #f0f0f0;
    color:#000;
    height:1.5rem;
    margin-right: 0.6rem;
    padding: 0.3rem 0.5rem;
    line-height: 1.5rem;
  }
  @media screen and (max-width:750px) {
    div{
      font-size: 1.4rem;
    }
    .article-list-item{
      margin-top:1rem;
      padding:0.5rem 1rem;
    }
    .article-list-item-metadata>span{
      margin-right:1rem;
    }
  }

</style>
