<template>
        <van-button
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            v-if="!isFollowed"
            :loading="isFollowedLoading"
            @click="onFollowed"
          >关注</van-button>
          <van-button
            class="follow-btn"
            round
            size="small"
            v-else
            :loading="isFollowedLoading"
            @click="onFollowed"
          >已关注</van-button>
</template>

<script>
  import {deleteFollowed,addFollowed} from "@/api/user"

export default {
    name:'FollowUserIndex',
    data(){
        return {
            isFollowedLoading:false,
        }
    },
    
    props:{
        // is_followed:{
        //     type:Boolean,
        //     required:true
        // },
        isFollowed:{
            type:Boolean,
            required:true
        },
        aut_id:{
            type:[String,Number],
            required:true
        },
        // value:{
        //     prop: Boolean, 
        //     required:true 
        // }
    },
    model:{
        prop:'isFollowed',
        event:'updateIsFollowed',

    },
    methods:{
        async onFollowed(){
        // console.log('触发')
        try{
          this.isFollowedLoading = true
          if (this.isFollowed) {
            await deleteFollowed(this.aut_id)
          }else{
            await addFollowed(this.aut_id)
          }
        //   this.$parent.isUpdate() 
        this.$emit('updateIsFollowed',!this.isFollowed)
        //   this.$emit('update_is_followed', !this.is_followed)
          this.isFollowedLoading = false
          
        }
        catch(e){
          this.isFollowedLoading = false
          if(e?.response?.status === 400){
            this.$toast.fail(e?.response?.data?.message || '自己不能关注自己')
          }else{
            this.$toast.fail(this.isFollowed ? '取消关注失败' : '添加关注失败')
          }
          console.log(e)
        }
      }
    }


}

</script>