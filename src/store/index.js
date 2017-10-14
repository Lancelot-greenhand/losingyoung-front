import Vue from 'vue'
import Vuex from 'vuex'
import {getLoginStatus as getLoginStatusFromServer} from '@/utils/utils.js'

Vue.use(Vuex)
const state = {
  isLogin: false,
  userInfo: null,
  activeNav: 'resources'
}
const mutations = {
  changeLoginStatus (state, isLogin) {
    state.isLogin = isLogin
    if (!isLogin) {
      state.userInfo = null
    }
  },
  saveUserInfo (state, userInfo) {
    state.userInfo = userInfo
    state.isLogin = true
  },
  changeActiveNav (state, activeNav) {
    state.activeNav = activeNav
  }
}
const actions = {
  getLoginStatus ({commit}) {
    getLoginStatusFromServer().then(response => {
      let resData = response.data
      if (resData.result) {
        commit('saveUserInfo', resData.user_info)
      }
    })
  }
}
export default new Vuex.Store({
  state,
  mutations,
  actions
})
