<template>
  <div>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="新增" name="add">
        <article-content :mode='add'>
        </article-content>
      </el-tab-pane>
      <el-tab-pane label="更新" name="update">
        <article-content :mode='update'>
        </article-content>
      </el-tab-pane>
      <el-tab-pane label="图片" name="image">
        <image-manage :mode='image'>
        </image-manage>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import ArticleContent from './articleContent'
  import ImageManage from './image.vue'
  export default {
    components: {
      ArticleContent,
      ImageManage
    },
    data () {
      return {
        add: 'add',
        update: 'update',
        image: 'image',
        activeTab: 'add'
      }
    }
  }
</script>
