import request from '@/utils/request'

export function getSearchSuggestions(params){
    return request({
        method: 'GET',
        url: '/v1_0/suggestion',
        params
    })
}


export function getSearchResult(params) {
    return request({
      method: "GET",
      url: "/v1_0/search",
      params
    })
  }

