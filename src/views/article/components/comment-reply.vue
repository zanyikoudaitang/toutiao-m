<template>
    <div class="comment-reply">
        <van-nav-bar :title="comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复'">
            
        </van-nav-bar>
        <comment-item :comment="comment" />

        <van-cell title="全部评论" />
        <CommentList 
        :list="list" 
        :source="comment.com_id" 
        type="c"
         />
        

        <div class="post-wrap">
                <van-button class="post-btn" size="small" round @click='isPostShow = true'>写评论</van-button>
        </div> 
    <!-- /发布评论 -->
     <!-- 发布评论的弹层，视频里面没有提到，自行补充 -->
        <van-popup v-model="isPostShow" position="bottom">
            <CommentPost :target="comment.com_id" @isPostShow="isPostShow = !isPostShow" @onPostComment="onPostComment"></CommentPost>
        </van-popup>
    </div>
  </template>
  
  <script>
  import CommentItem from './comment-item.vue'
  import CommentList from './comment-list.vue'
  import CommentPost from './comment-post.vue'

  export default {
    name: 'CommentReply',
    components: {
        CommentItem,
        CommentList,
        CommentPost
    },
    props: {
        comment:{
            type:Object,
            required:true
        }
    },
    data () {
      return {
        list:[],
        isPostShow : false
      }
    },
    computed: {},
    watch: {},
    created () {},
    mounted () {},
    methods: {
        onPostComment(comment){
        this.list.unshift(comment);
        this.$toast.success('发布成功')
        this.comment.reply_count++
      },
    }
  }
  </script>
  
  <style scoped lang="less">
  .post-wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 88px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-top: 1px solid #d8d8d8;
    .post-btn {
        width: 60%;
    }
}
.scroll-wrap {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto; 
}
  
  </style>