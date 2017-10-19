<template>
	<div class="l-header">
  <!-- 桌面header -->
    <div class="horizontal-menu">
      <div class="welcome-msg" v-if="isLogin">{{welcomeMsg}}</div>
      <div class="welcome-msg log-btn" v-else>
        <span >{{welcomeMsg}}<a @click='signin'>登陆</a><a @click='signup'>注册</a></span>
      </div>
      <el-menu :default-active='activeIndex' class="wide-nav-bar" mode="horizontal">
        <el-submenu index="1">
          <template slot="title">没有分类</template>
          <el-menu-item :index="routeIndex.resources"><router-link to='/index/resources'>你可能想要的福利资源</router-link></el-menu-item>
          <el-menu-item :index="routeIndex.bullshit"><router-link to='/index/bullshit'>啥？</router-link></el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">其乐融融</template>
          <el-menu-item :index="routeIndex.photos"><router-link to='/photos'>我们</router-link></el-menu-item>
        </el-submenu>
       <el-menu-item :index="routeIndex.twit" @click='underConstruction'><a onclick="javascript:void(0)">碎碎念</a></el-menu-item>
      </el-menu>
      </div>
      <!-- 短屏header -->
    <div class="mobile-top-bar">
      <span class="side-menu-icon"><a @click.prevent="showSideMenu = !showSideMenu"><i class="fa fa-bars"></i></a></span>
    </div>
    <!-- 短屏侧边菜单 -->
    <side-menu class="mobile-side-menu" :show="showSideMenu"></side-menu>
  </div>
</template>
<script>
  import SideMenu from './SideMenu'
  export default {
    components: {
      SideMenu
    },
    data () {
      return {
        showSideMenu: false,
        routeIndex: {
          resources: '1-1',
          bullshit: '1-2',
          photos: '2-1',
          twit: '3'
        }
      }
    },
    computed: {
      userName () {
        return this.$store.state.userInfo && this.$store.state.userInfo.user_name || ''
      },
      welcomeMsg () {
        let time = new Date().getHours()
        let userName = this.userName
        let greeting = ''
        if (time > 6 && time < 12) {
          greeting = '早上好'
        } else if (time >= 12 && time < 13) {
          greeting = '中午好'
        } else if (time >= 13 && time < 18) {
          greeting = '下午好'
        } else if (time >= 18 || time <= 6) {
          greeting = '晚上好'
        } else {
          greeting = '你好'
        }
        return `${greeting}, ${userName}`
      },
      activeIndex () {
        return this.routeIndex[this.$store.state.activeNav]
      },
      isLogin () {
        return this.$store.state.isLogin
      }
    },
    methods: {
      underConstruction () {
        this.$alert('建设中...')
      },
      signin () {
        this.$alert('登陆')
      },
      signup () {
        this.$alert('注册')
      }
    }
  }
</script>
<style sass>
/*http://ourrovucw.bkt.clouddn.com/image/limg/chinese_painting1.jpg*/
  .horizontal-menu{
    position: fixed;
    top:0;
    width:100%;
    font-size: 1.6rem;
    min-height: 8rem;
    /* background-image: url('../assets/images/chinese_painting1.jpg'); */
    background-color: #fff;
    background-size: cover;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index:100;
  }
  .horizontal-menu .welcome-msg{
    flex-shrink: 0;
    margin-left:100px;
  }
  .wide-nav-bar{
    margin-right:100px;
  }
  .el-menu{
    background-color: transparent;
  }
  .el-menu--horizontal .el-submenu .el-submenu__title{
    background-color: transparent !important;
  }
  .el-menu--horizontal>.el-menu-item:hover{
    background-color: transparent;
  }
  .el-submenu .el-menu-item{
    min-width: 100px;
  }
  .el-submenu .el-menu-item:hover{
    color:#fff;
    font-size: 1.6rem;
  }
  .el-submenu .el-menu-item a{
    display: block;
  }
  .log-btn a{
    font-weight: bold;
    cursor: pointer;
    margin-right: 10px;
  }
  @media screen and (min-width: 750px){
    .horizontal-menu{
      /*padding: 0 100px;*/
    }
    .mobile-side-menu{
      display: none;
    }
    .mobile-top-bar{
      display: none;
    }
  }
  @media screen and (max-width: 750px){
    .horizontal-menu{
      padding: 0 50px;
      display: none;
    }
    .wide-nav-bar{
      display: none;
    }
    .mobile-top-bar{
      display: block;
      position: fixed;
      top:0;
      width:100%;
      font-size: 1.2rem;
      min-height: 4rem;  
      background: linear-gradient(to bottom, #eee, #fff 50%);
      box-shadow: 0 0 2px rgba(0,0,0,0.25);
      z-index:100;    
    }
    .mobile-side-menu{
      z-index: 99;
      display: block;
      position: absolute;
      top: 20px;
      right:50px;
      font-size:1.4rem;
    }
    .side-menu-icon i {
      line-height: 2rem;
      font-size: 2rem;
      color:#bcbcbc;
    }
    .side-menu-icon{
      display: block;
      position: absolute;
      right: 30px;
      top: 1.2rem;
    }
  }
</style>
