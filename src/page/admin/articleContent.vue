<template>
  <div>
    <div class="query-id-wrapper" v-if="!isAdd">
      <span>id: </span>
      <el-input class='query-id' v-model="queryId"></el-input>
      <el-button @click="queryArticle">查询</el-button>
    </div>
    <div class="article-edit-group">
      <div class="edit-col" v-show="showEditArea">
        <el-input 
        type="textarea"
        :autosize="{minRows:10}"
        v-model="text">
        </el-input>
      </div>
      <div class="edit-col">
        <div class="preview-content" v-html="preview"></div>
      </div>
    </div>
    <div class='article-meta-data-group'>
      <el-input v-model="title" placeholder="标题"></el-input>
      <el-input v-model="author" placeholder="作者"></el-input>
      <!-- <el-input v-model="brief_intro" placeholder="简介，默认截取140字符" type="textarea" autosize></el-input> -->
      <el-input v-model="tags" placeholder="标签"></el-input>
      <el-select v-model="category" placeholder="选择分类">
        <el-option
          v-for="item in categoryOp"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="btn-group" v-if="isAdd">
      <el-button @click="previewResult">预览</el-button>
      <el-button @click="saveContent">保存</el-button>
      <el-button @click="initAdd">再次新增</el-button>
    </div>
    <div class="btn-group" v-else>
      <el-button @click="previewResult">预览</el-button>
      <el-button @click="saveContent">更新</el-button>
    </div>
  </div>
</template>
<script>
  var MarkdownIt = require('markdown-it')
  import md5 from 'blueimp-md5'
  import {getArticleItem, addNewArticle, updateArticle} from '@/service/getData.js'
  export default {
    props: {
      mode: ''
    },
    data () {
      return {
        isNewAdd: '',
        text: '',
        showEditArea: true,
        queryId: '',
        articleId: '',
        title: '',
        author: '',
        // brief_intro: '',
        tags: '',
        category: '',
        categoryOp: [{
          value: 'resources',
          label: '资源'
        }, {
          value: 'bullshit',
          label: '随笔'
        }]
      }
    },
    computed: {
      preview () {
        let md = new MarkdownIt()
        let preview = md.render(this.text)
        return preview
      },
      href () {
        let base = '#/index/article'
        let id = this.articleId
        return base + '/' + id
      },
      isAdd () {
        let re = this.isNewAdd = this.mode === 'add'
        return re
      }
    },
    methods: {
      previewResult () {
        this.showEditArea = !this.showEditArea
      },
      saveContent () {
        if (this.title.length === 0) {
          this.$alert('请输入标题')
          return
        }
        if (this.isNewAdd) {
          let date = (new Date()).toDateString()
          this.articleId = md5(date, this.title)
        }
        let briefIntro = this.text.length > 140 ? this.text.substr(0, 140) + '...' : this.text
        let data = {
          id: this.articleId,
          href: this.href,
          author: this.author,
          title: this.title,
          brief_intro: briefIntro,
          tags: this.tags,
          category: this.category,
          text: this.text
        }
        if (this.isNewAdd) {
          this.addNewContent(data)
        } else {
          this.updateNewContent(data)
        }
      },
      addNewContent (data) {
        addNewArticle(data).then(res => {
          let resData = res.data
          if (!resData.result) {
            this.$alert('保存失败， 请重试')
            return
          }
          this.$alert('保存成功')
          this.isNewAdd = false
        })
      },
      updateNewContent (data) {
        updateArticle(data).then(res => {
          let resData = res.data
          if (!resData.result) {
            this.$alert('保存失败， 请重试')
            return
          }
          this.$alert('保存成功')
        })
      },
      initAdd () {
        this.isNewAdd = true
        this.articleId = ''
        this.clearContent()
      },
      clearContent () {
        this.text = ''
        this.author = ''
        this.title = ''
        this.tags = ''
        this.category = ''
      },
      queryArticle () {
        let params = {
          id: this.queryId
        }
        getArticleItem(params).then(response => {
          let resData = response.data
          if (resData.result) {
            this.articleId = this.queryId
            this.fillArticleContent(resData.item)
            return
          }
          this.$alert('没找到此id的文章')
        })
      },
      fillArticleContent ({text, author, title, tags, category}) {
        this.text = text
        this.author = author
        this.title = title
        // this.brief_intro = rest.brief_intro
        this.tags = tags
        this.category = category
      }
    }
  }
</script>
<style scoped>
  .query-id-wrapper{
    display: flex;
  }
  .query-id{
    width: 40%;
  }
  .article-edit-group{
    display: flex;
    justify-content:center;
  }
  .article-edit-group>.edit-col{
    min-width: 50%;
    text-align: left;
    border: 1px solid #bcbcbc;
  }
  .article-meta-data-group{
    width:20%;
  }
</style>
