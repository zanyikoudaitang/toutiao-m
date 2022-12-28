import request from "@/utils/request";

export const deleteFollowed = (userId) => {
  return request({
    method: "DELETE",
    url: "/v1_0/user/followings/:" + userId,
  });
};

export const addFollowed = (userId) => {
  return request({
    method: "POST",
    url: "/v1_0/user/followings/",
    data:{
        target:userId
    }
  });
};



// 获取用户资料
export const getUserProfile = () => {
  return request({
    url: "/v1_0/user/profile",
  });
};


// 修改用户资料
export const updateUserProfile = data => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data
  })
}

/**
 * 更新用户照片资料
 */
export const updateUserPhoto = data => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/photo',
    data
  })
}

