<template>
  <div class="index-main">
    <div class="index-main-body">
      <div class="login-header"></div>
      <div class="login-body">
        <div class="tab">
          <div class="tab-head">
            <router-link to="/login/signin" class='tab-item' :class="{'active-tab': isSignin}">登陆</router-link>
            <router-link to="/login/signup" class='tab-item' :class="{'active-tab': isSignup}">注册</router-link>
            <span class="tab-slider-bar" :style="{'margin-left': isSignin? '1rem': '6.5rem'}"></span>
          </div>
          <div class="tab-body">
            <router-view></router-view>
            <div class='login-no-name' >
              <a @click='loginAsTourist'>游客登陆</a>
              <span class="other-logins">
                <i class="fa fa-github" aria-hidden="true" @click='loginGithub'></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  const routeNames = {
    Signin: 'Signin',
    Signup: 'Signup'
  }
  // import {redirectGithub} from '@/service/getData.js'
  export default {
    data () {
      return {
        isSignin: true,
        isSignup: false
      }
    },
    watch: {
      $route (to, from) {
        let toRouteName = to.name
        this.changeTab(toRouteName)
      }
    },
    methods: {
      changeTab (toTab) {
        Object.keys(routeNames).forEach((key) => {
          if (routeNames[key] === toTab) {
            this[`is${key}`] = true // key只要保持和isSignin一致即可
          } else {
            this[`is${key}`] = false
          }
        })
      },
      loginAsTourist () {
        this.$router.push({path: '/index'})
      },
      loginGithub () {
        location.replace('/api/oauth/redirect_github?callback=' + location.href)
      }
    },
    created () {
      this.changeTab(this.$route.name)
    }
  }
</script>
<style scoped lang="scss">
  $img-base-url: "http://ourrovucw.bkt.clouddn.com/image/limg";
  .index-main{
    font-size: 2rem;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .index-main-body{
    width: 25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .login-header{
    min-height:280px;
    /*background-image: url('../assets/images/chinese_painting_dragon.png');*/
    background-image: url(#{$img-base-url}/chinese_painting_dragon.gif);
    background-size: contain;
    background-repeat: no-repeat;
    width: 16rem;
  }
  .login-body{
    min-height:300px;
    width: 100%;
  }
  .tab .tab-head{
    margin-bottom: 10px;
    position: relative;
    display: inline-block;
  }
  .tab .tab-item{
    opacity: 0.7;
    transition: opacity color 0.15s;
    display: inline-block;
    width:5rem;
  }
  .tab .tab-item:hover{
    opacity: 1
  }
  .tab .tab-slider-bar{
    position: absolute;
    left: 0;
    bottom: 0;
    background-color: #0f88eb;
    width: 3rem;
    height: 2px;
    transition: margin-left 0.15s;
  }
  .tab .active-tab{
    color:#0f88eb;
    opacity: 1;
  }
</style>
<style>
  .login-input-group{
    border:1px solid #d5d5d5;
    border-bottom: 0;
    margin:5px 0;
  }
  .login-input{
    display: block;
    height: 4rem;
    width: 100%;
    box-sizing: border-box;
    border: 0;
    border-bottom: solid 1px #d5d5d5;
    padding:0.8rem 1rem;
    font-size: 1.5rem;
  }
  .login-input:focus{
    outline: none;
  }
  .login-button{
    width:100%;
    margin:10px 0;
    padding: 0.7rem 0;
  }
  .login-no-name{
    font-size: 1.5rem;
    cursor: pointer;
    position: relative;
  }
  .other-logins{
    position: absolute;
    right: 0;
    font-size: 18px;
  }
</style>
