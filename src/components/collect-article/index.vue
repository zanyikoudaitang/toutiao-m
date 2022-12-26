<template>
    <van-button
      :icon="value ? 'star' : 'star-o'"
      :class="{
        collected: value  //根据收藏状态，应用.collected样式
      }"
      :loading='loading'
      @click="onCollection"
    />
  </template>
  
  <script>
  import {addCollection,deleteCollection} from '@/api/article'
  export default {
    name: 'CollectArticle',
    props: {
      value: {
        type: Boolean,
        required: true
      },
      articleId:{
        type:[Number,String,Object],
        required: true
      }
    },
    data(){
        return {
            loading:false
        }
    },
    methods:{
        async onCollection(){
            this.loading = true;
            try{
                if(this.value){
                    await deleteCollection(this.articleId)
                }else{
                    await addCollection(this.articleId)
                }
                this.$emit('input',!this.value)
                this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
                this.loading = false;
            }catch(e) {
                this.$toast.fail('操作失败，请重试')
                this.loading = false;
            }
        }
    }
  }
  </script>
  
  <style scoped lang="less">
  .collected {
    .van-icon {
      color: #ffa500;
    }
  }
  </style>