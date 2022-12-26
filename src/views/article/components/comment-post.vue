<template>
    <div class="comment-post">
      <van-field
        class="post-field"
        v-model.trim="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
      />
      <van-button class='post-btn'    @click="onPost">发布</van-button>
    </div>
  </template>
  
  <script>
  import {postComment} from '@/api/comment'
  export default {
    name: 'CommentPost',
    components: {},
    props: {
        target:{
            type:[Number,String,Object],
            required: true
        }
    },
    data () {
      return {
        message: '',
        loading:false,
      }
    },
    computed: {},
    watch: {},
    created () { },
    mounted () { },
    methods: {
        async onPost(){
            try{
                this.$toast.loading({
                    message: '加载中...',
                    forbidClick: true,
                    duration:0
                });
                this.loading = true;
                const ret = await postComment({
                    target:this.target,
                    content:this.message,
                    art_id:''
                })
                this.loading = false;
                this.$emit('isPostShow')
                this.$emit('onPostComment',ret.data.data.new_obj
)
                this.$toast.success('发布成功')
                console.log(ret)
            }catch(e){
                this.loading = false;
                this.$toast.fail('发布失败')
                console.log(e)
            }

        }
    }
  }
  </script>
  
  <style scoped lang="less">
  .comment-post {
    display: flex;
    align-items: center;
    padding: 32px 0 32px 32px;
    .post-field {
      background-color: #f5f7f9;
    }
    .post-btn {
      width: 150px;
      border: none;
      padding: 0;
      color: #6ba3d8;
      background: #fff;
      &::before {
        display: none;
      }
    }
  }
  </style>