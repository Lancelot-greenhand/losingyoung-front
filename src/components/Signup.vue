<template>
<div>
  <div class="login-input-group">
    <div>
      <input type="text" v-model="account" class="login-input" placeholder="账号(只能包含字母，数字，下划线)" />
    </div>
    <div>
      <input type="password" v-model="pwd" class="login-input" placeholder="密码(不少于6位)" />
    </div>
    <div>
      <input type="user_name" v-model="user_name" class="login-input" placeholder="昵称" />
    </div>
  </div>
  <button @click="validateAddUser" class="login-button">注册</button>
</div>
</template>
<script>
  import md5 from 'blueimp-md5'
  import {getBrowser} from '@/utils/utils.js'
  export default {
    data () {
      return {
        account: '',
        pwd: '',
        user_name: ''
      }
    },
    methods: {
      validateAddUser () {
        if (!this.account) {
          this.$alert('请填写账号')
          return
        }
        if (!this.pwd || this.pwd.length < 6) {
          this.$alert('密码不得少于6位')
          return
        }
        if (!this.user_name) {
          this.$alert('请填写昵称')
        }
        this.addUser()
      },
      addUser () {
        let account = this.account
        let pwd = md5(this.pwd, this.account)
        let userName = this.user_name
        let bId = getBrowser().join()
        let data = {
          account,
          pwd,
          userName,
          b_id: bId
        }
        this.$http.post('/api/user/register_new_user', data).then((response) => {
          console.log('注册后', result)
          let result = response.data
          if (result.err) {
            this.$alert('服务器错误，请稍后重试')
            return
          }
          if (result.result === true) {
            this.$store.commit('saveUserInfo', result.user_info)
            this.account = ''
            this.pwd = ''
            this.user_name = ''
            this.$router.push({path: '/index'})
            return
          }
          this.$alert(result.result)
        }).catch(err => {
          this.$alert('服务超时， 请稍后重试')
          console.log(err)
        })
        // this.$router.push({path: '/index'})
      }
    }
  }
</script>
<style scoped>
  
</style>
