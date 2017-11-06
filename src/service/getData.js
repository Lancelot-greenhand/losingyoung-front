import axios from 'axios'
export const getArticleItem = params => axios.get('/api/article/get_artcile_item', {
  params
})

export const getArticleList = params => axios.get('/api/article/get_article_list', {
  params
})

export const addNewArticle = params => axios.post('/api/article/add_article', params)

export const updateArticle = params => axios.post('/api/article/update_article', params)

export const uploadImage = params => axios.post('/api/image/upload', params)

export const getImageList = params => axios.get('/api/image/get_image_list', {
  params
})

export const getImageItem = params => axios.get('/api/image/get_image_item', {
  params
})

export const loginValidateUser = params => axios.get('/api/user/login_validate_user', params)

export const getSpiderCarData = params => axios.get('api/spider/get_all_car_data', params)
