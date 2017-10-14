<template>
<div>
  <div class="login-input-group">
    <div>
      <input type="text" v-model="account" class="login-input" placeholder="账号" />
    </div>
    <div>
      <input type="password" v-model="pwd" class="login-input" placeholder="密码" />
    </div>
  </div>
  <button @click="login" class="login-button">登陆</button>
</div>
</template>
<script>
  import md5 from 'blueimp-md5'
  import {getBrowser} from '@/utils/utils.js'
  export default {
    data () {
      return {
        account: '',
        pwd: ''
      }
    },
    methods: {
      validateUser () {
        if (!this.account) {
          this.$alert('请填写账号')
          return false
        }
        if (!this.pwd || this.pwd.length < 6) {
          this.$alert('密码错误')
          return false
        }
        let data = {
          account: this.account,
          pwd: md5(this.pwd, this.account),
          b_id: getBrowser().join()
        }
        return this.$http.post('/api/user/login_validate_user', data)
      },
      login () {
        let validateResult = this.validateUser()
        if (validateResult !== false) {
          validateResult.then(res => {
            let result = res.data
            if (result.err) {
              this.$alert('服务器错误，请稍后登陆')
              return
            }
            if (result.result === true) {
              // this.$alert('登陆成功，马上跳转')
              this.account = ''
              this.pwd = ''
              this.$store.commit('saveUserInfo', result.user_info)
              this.$router.push({path: '/index'})
              return
            }
            this.$alert(result.result)
          })
        }
      }
    }
  }
</script>
<style scoped>
  
</style>
