import Vue from 'vue'
import Router from 'vue-router'
import {getLoginStatus} from '@/utils/utils.js'
const Login = resolve => require(['@/page/Login.vue'], resolve)
const Signup = resolve => require(['@/components/Signup.vue'], resolve)
const Signin = resolve => require(['@/components/Signin.vue'], resolve)
const Index = resolve => require(['@/page/Index.vue'], resolve)
const ArticleList = resolve => require(['@/components/ArticleList.vue'], resolve)
const ArticleItem = resolve => require(['@/components/ArticleItem.vue'], resolve)
const notFound = resolve => require(['@/components/notFound.vue'], resolve)
const Admin = resolve => require(['@/page/admin/index.vue'], resolve)
const ArticleManage = resolve => require(['@/page/admin/article.vue'], resolve)
const Photos = resolve => require(['@/page/photos.vue'], resolve)
const PhotoList = resolve => require(['@/components/photoList.vue'], resolve)
const PhotoGallery = resolve => require(['@/components/photoGallery.vue'], resolve)
// 爬虫
const SpiderData = resolve => require(['@/page/spider-data'], resolve)
const SpiderCar = resolve => require(['@/page/spider-data/car.vue'], resolve)

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      alias: '',
      component: Login,
      // 免登录
      beforeEnter: (to, from, next) => {
        getLoginStatus().then(response => {
          let resData = response.data
          if (resData.result) {
            next('/index')
          } else {
            next()
          }
        })
      },
      children: [{
        path: 'signup',
        name: 'Signup',
        component: Signup
      }, {
        path: 'signin',
        name: 'Signin',
        component: Signin,
        alias: ''
      }]
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      redirect: '/index/bullshit',
      children: [{
        path: 'resources',
        name: 'resources',
        component: ArticleList
      }, {
        path: 'bullshit',
        name: 'bullshit',
        component: ArticleList
      }, {
        path: 'article/:article_id',
        name: 'article',
        component: ArticleItem
      }]
    }, {
      path: '/photos',
      name: 'photos',
      component: Photos,
      children: [{
        alias: '',
        path: 'list',
        name: 'photoList',
        component: PhotoList
      }, {
        path: 'list/:list_id',
        name: 'photoGallery',
        component: PhotoGallery
      }]
    }, {
      path: '/admin',
      name: 'admin',
      component: Admin
    }, {
      path: '/admin/article',
      name: 'articleManagement',
      component: ArticleManage
    }, {
      path: '/spider-data',
      name: 'spiderData',
      component: SpiderData,
      children: [{
        path: 'car',
        name: 'spiderDataCar',
        component: SpiderCar
      }]
    }, {
      path: '*',
      component: notFound
    }
  ]
})
router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)
  next()
})
export default router
