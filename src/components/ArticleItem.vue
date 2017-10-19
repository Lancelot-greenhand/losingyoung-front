<template>
  <div>
    <div class='breadcrumb-article'>
      <l-breadcrumb >
        <l-breadcrumb-item :to="categoryLink">{{category}}</l-breadcrumb-item>
        <l-breadcrumb-item curItem="true">{{title}}</l-breadcrumb-item>
      </l-breadcrumb>
    </div>
    <h1>{{title}}</h1>
    <div class="meta-data">
      <span><i class="el-icon-date"></i>{{article_date | formatCreatedDate}}</span>
      <span><i class="fa fa-user"></i>{{author}}</span>
    </div>
    <div class="main-content" v-html="text"></div>
  </div>
</template>
<script>
  import {getArticleItem} from '@/service/getData.js'
  import {formatDate} from '@/utils/utils.js'
  import lBreadcrumb from '@/components/breadcrumb/breadcrumb'
  import lBreadcrumbItem from '@/components/breadcrumb/breadcrumb-item'
  import {categoryName, categoryPath} from '@/config/index.js'
  let hljs = require('highlight.js')
  let md = require('markdown-it')({
    highlight (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value
        } catch (__) {}
      }
      return ''
    }
  })
  export default {
    components: {
      lBreadcrumb,
      lBreadcrumbItem
    },
    data () {
      return {
        title: '',
        text: '',
        article_date: '',
        author: '',
        category: '',
        categoryLink: ''
      }
    },
    watch: {
      id () {
        this.getArticleInfo()
      }
    },
    computed: {
      id () {
        return this.$route.params.article_id
      }
    },
    methods: {
      getArticleInfo () {
        getArticleItem({id: this.id}).then(response => {
          let resData = response.data
          if (resData.result) {
            let info = resData.item
            this.text = md.render(info.text)
            // this.text = hljs.highlight('javascript', 'var x = 2; x = 3; function a () {}').value
            this.title = info.title
            this.article_date = info.created_date
            this.author = info.author
            this.category = categoryName[info.category]
            this.categoryLink = categoryPath[info.category]
            console.log(this.categoryLink)
            return
          }
          this.text = '没找着'
        })
      }
    },
    filters: {
      formatCreatedDate (value) {
        return formatDate(value)
      }
    },
    created () {
      window.scrollTo(0, 0) // 直接跳转由于页面不刷新，滚动条会保留
      this.getArticleInfo()
    }
  }
</script>
<style scoped>
  .meta-data{
    font-size:1.4rem;
  }
  .meta-data span{
    margin-right: 0.5rem;
  }
  .meta-data i{
    margin-right:0.3rem;
  }
  .main-content{
    text-align: left;
    font-size:1.6rem;
  }
  .breadcrumb-article{
    padding-top:10px;
    font-size:1.4rem;
  }
</style>
