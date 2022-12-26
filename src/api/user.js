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
