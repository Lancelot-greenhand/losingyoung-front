const mode = 'dev'
let baseUrl = ''
switch (mode) {
  case 'prod':
    baseUrl = 'http://www.losingyoung.com/'
    break
  case 'dev':
    baseUrl = 'http://localhost:3000/'
    break
}

export const config = {
  baseUrl
}

export const categoryName = {
  bullshit: '随笔',
  resources: '资源'
}

export const categoryPath = {
  bullshit: '#/index/bullshit',
  resources: '#/index/resources'
}
