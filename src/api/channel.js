import request from '@/utils/request'

export const loadArticlesList = params => {
  return request({
    method: 'GET',
    url: '/v1_0/articles',
    params
  })
}

export const getAllChannel = () => {
  return request({
    method: 'GET',
    url: '/v1_0/channels'
  })
}

export const addUserChannel = (data) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data
  })
}


export const  deleteUserChannel = (channelId) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${channelId}`,
    
  })
}
