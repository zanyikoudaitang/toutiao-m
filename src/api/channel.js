import request from '@/utils/request'

export const loadArticlesList = params => {
  return request({
    method: 'GET',
    url: '/v1_0/articles',
    params
  })
}