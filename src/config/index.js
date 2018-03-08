
let baseUrl = process.env.NODE_ENV === 'production' ? 'http://www.losingyoung.com/' : 'http://localhost:3000/'

export const config = {
  baseUrl
}

export const categoryName = {
  bullshit: '随笔',
  resources: '资源'
}

export const categoryPath = {
  bullshit: '/index/bullshit',
  resources: '/index/resources'
}
