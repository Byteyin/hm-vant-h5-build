import request from '@/utils/request'

// 获取面经列表
export const getArticleList = function (params) {
  return request.get('/h5/interview/query', { params })
}

// 收藏列表查询
export const getArticleCollect = function (page) {
  return request.get('/h5/interview/opt/list', {
    params: {
      optType: 2, // 收藏
      pageSize: 10,
      page
    }
  })
}

// 点赞列表查询
export const getArticleLike = function (page) {
  return request.get('/h5/interview/opt/list', {
    params: {
      optType: 1, // 点赞
      pageSize: 10,
      page
    }
  })
}

// 获取单个面经详情
export const getArticleDetail = function (id) {
  return request.get('/h5/interview/show', {
    params: { id }
  })
}

// 点赞与否
export const updateLike = function (id) {
  return request.post('/h5/interview/opt', {
    id,
    optType: 1 // 点赞
  })
}

// 收藏与否
export const updateCollect = function (id) {
  return request.post('/h5/interview/opt', {
    id,
    optType: 2 // 收藏
  })
}
