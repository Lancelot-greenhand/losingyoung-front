import axios from 'axios'
import {parse as parseDate, getYear, getMonth, getDate} from 'date-fns'
const hljs = require('highlight.js')
const md = require('markdown-it')({
  highlight (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value
      } catch (__) {}
    }
    return ''
  }
})
const getBrowser = function () {
  var Sys = {}
  var ua = navigator.userAgent.toLowerCase()
  var s
  (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1]
  : (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1]
  : (s = ua.match(/edge\/([\d.]+)/)) ? Sys.edge = s[1]
  : (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1]
  : (s = ua.match(/(?:opera|opr).([\d.]+)/)) ? Sys.opera = s[1]
  : (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1]
  : (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0
  // 根据关系进行判断
  if (Sys.ie) return (['IE', Sys.ie])
  if (Sys.edge) return (['EDGE', Sys.edge])
  if (Sys.firefox) return (['Firefox', Sys.firefox])
  if (Sys.chrome) return (['Chrome', Sys.chrome])
  if (Sys.opera) return (['Opera: ' + Sys.opera])
  if (Sys.safari) return (['Safari: ' + Sys.safari])
  return 'Unkonwn'
}
const getLoginStatus = function () {
  let browserId = getBrowser().join()
  let data = {
    b_id: browserId
  }
  return axios.post('/api/user/auto_login', data)
}

const formatDate = function (value) {
  let date = parseDate(value)
  let year = getYear(date)
  let month = getMonth(date) + 1
  let day = getDate(date)
  let res = `${year}年${month}月${day}日`
  return res
}

export {
  getBrowser,
  getLoginStatus,
  formatDate,
  md
}
