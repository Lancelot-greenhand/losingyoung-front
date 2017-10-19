<template>
  <div>
    <label>路径(存到images/): <input type="text" placeholder="eg：us/nl" v-model="uploadPath"/></label>
    <input type="file" name="image" @change = "uploadImage" multiple/>
    <div><ul id='previewImage'></ul></div>
    <img id='testI'/>
  </div>
</template>
<script>
  import {uploadImage} from '@/service/getData.js'
  import md5 from 'blueimp-md5'
  export default {
    data () {
      return {
        uploadPath: ''
      }
    },
    methods: {
      uploadImage (e) {
        let input = e.target
        let files = input.files
        if (window.FileReader) {
          // 删除旧的
          this.clearPics()
          let fileCount = files.length
          let uploadResult = {
            succeed: 0,
            fail: 0
          }
          // 遍历所有上传的file
          Array.from(files, file => {
            let reader = new FileReader()
            let imgId = this.getRandomId()
            reader.onloadend = (e) => {
              let source = e.target.result
              this.showUploadItem(source, imgId)
              uploadImage({
                source,
                name: file.name,
                user_name: this.getUserName(),
                img_dir: this.uploadPath
              }).then(response => {
                let resData = response.data
                if (resData.result) {
                  uploadResult.succeed++
                  document.getElementById(imgId).src = resData.href
                } else {
                  uploadResult.fail++
                }
                fileCount--
                if (fileCount === 0) {
                  let msg = `上传成功${uploadResult.succeed}个，失败${uploadResult.fail}个`
                  this.$alert(msg)
                }
              })
            }
            reader.readAsDataURL(file)
          })
        }
      },
      showUploadItem (source, id) {
        let img = document.createElement('img')
        let li = document.createElement('li')
        let list = document.getElementById('previewImage')
        img.src = source
        img.id = id
        li.appendChild(img)
        list.appendChild(li)
      },
      clearPics () {
        let list = document.getElementById('previewImage')
        let childLi = list.childNodes
        for (let i = childLi.length - 1; i >= 0; i--) {
          list.removeChild(childLi[i])
        }
      },
      getUserName () {
        let userName = this.$store.state.userInfo && this.$store.state.userInfo.user_name || ''
        return userName
      },
      getRandomId () {
        let r = (Math.random()) * (Math.random())
        let date = (new Date()).toString()
        let id = md5(r, date)
        return id
      }
    }
  }
</script>
