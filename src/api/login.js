import request from '@/utils/request'
export function login(data){
    return request({
        method:'POST',
        url:'v1_0/authorizations',
        data
    })
}

export function getSmsCode(data){
    return request({
        url: `v1_0/sms/codes/${data}`
    })
    
}


export function getUserInfo(){
    return request({
        url: 'v1_0/user',
        
    })
    
}


// 用户列表
export const getUserChannels = () => {
    return request({
      method: 'GET',
      url: '/v1_0/user/channels'
    })
  }
