<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left='onClickLeft'
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading
          color="#3296fa"
          vertical
        >加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{article.title}}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{article.aut_name}}</div>
          <div slot="label" class="publish-date">{{article.pubdate | relativeTime}}</div>
          <!-- <FlollowUser 
          class="follow-btn"
          :is_followed="article.is_followed" 
          :aut_id="article.aut_id"
          @update_is_followed="article.is_followed = $event"
          ></FlollowUser> -->
          <FlollowUser 
          class="follow-btn"
          v-model="article.is_followed" 
          :aut_id="article.aut_id"
          ></FlollowUser>
          <!-- <van-button
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            v-if="!article.is_followed"
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
          >已关注</van-button>-->
        </van-cell> 
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div ref="article-content" class="article-content markdown-body" v-html="article.content"></div>
        <van-divider>正文结束</van-divider>

         <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="isPostShow = true"
      >写评论</van-button>
      <van-icon
        name="comment-o"
        :badge="totalCommentCount"
        color="#777"
      />
      <!-- <van-icon
        color="#777"
        name="star-o"
      /> -->
      <CollectArticle class="btn-item" :articleId="article.art_id" v-model="article.is_collected" />
      
      <!-- <van-icon
        color="#777"
        name="good-job-o"
      /> -->
        <likeArticle :articleId="article.art_id" v-model="article.attitude"/>

      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->

    <!-- 评论列表 -->
    <CommentList 
    :list="commentLists" 
    :source="article.art_id" 
    @replyClick="onReplyClick" />
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="error == 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->

      <van-popup
          v-model="isPostShow"
          position="bottom"
      >
      <CommentPost  :target="article.art_id" @isPostShow="isPostShow = !isPostShow" @onPostComment="onPostComment"></CommentPost>
      </van-popup>
    </div>

    <van-popup
      v-model="isReplyShow"
      position="bottom"
      closeable
      close-icon-position="top-left"
      :style="{height: '100%'}"
    >
    <CommentReply v-if="isReplyShow" :comment="currentComment"></CommentReply>
    </van-popup>
   
  </div>
</template>
  
  <script>
  import {getArticleById} from "@/api/article"
  import { ImagePreview } from "vant";
  import FlollowUser from '@/components/follow-user'
  import CollectArticle from '@/components/collect-article'
  import likeArticle from "@/components/like-article"

  import CommentPost from './components/comment-post.vue'

  import CommentList from './components/comment-list.vue'

  import CommentReply from "./components/comment-reply.vue";
  // ImagePreview({
  // images: [
  //   'https://img01.yzcdn.cn/vant/apple-1.jpg',
  //   'https://img01.yzcdn.cn/vant/apple-2.jpg',
  // ],
  // startPosition: 1,
// });
  export default {
    name: 'ArticleIndex',
    components: {
      FlollowUser,
      CollectArticle,
      likeArticle,
      CommentList,
      CommentPost,
      CommentReply,
    }, 
   
    data () {
      return {
        commentLists:[],
        loading:true,
        article : {},
        error: '',
        totalCommentCount:'',
        isPostShow:false,
        isReplyShow:false,
        currentComment:{},
        
      }
    },
    provide(){
      return {
        articleId:this.articleId
      }
    },
    props:{
        articleId:{
            type:[String,Number],
            required:true
        }
    },
    computed: {
    },
    watch: {},
    created () {
      this.loadArticle()
    },
    mounted () {
      // console.log(this.$refs['article-content'])
    },
    methods: {
      async loadArticle(){
        try{
          this.loading = true;
          const ret = await getArticleById(this.articleId);
          // console.log(data)
          this.loading = false;
          this.article = ret.data.data
          this.$nextTick(()=>{
            this.previewImage()
          })

        }catch(e) {
          this.loading = false;
          this.error = e?.response?.status || "其他异常"
          console.log(e)
        }
      },
      previewImage(){
        const imgs = this.$refs['article-content'].querySelectorAll('img')
        imgs.forEach((element,index) => {
              element.onclick = function() {
                ImagePreview({
                  images:[...imgs].map(it=>it.src),
                  startPosition: index,
                });
              }
            });
      },
      isUpdate(){
        this.article.is_followed = !this.article.is_followed
      },
      onClickLeft(){
        this.$router.push('/')
      },
      onPostComment(comment){
        this.commentLists.unshift(comment);
        this.$toast.success('发布成功')
        this.totalCommentCount++
      },
      onReplyClick(comment){
        this.currentComment = comment
        this.isReplyShow = true
      }
      
    }
  }
  </script>
  <style scoped lang="less">
    @import "./github-markdown.css";

  .article-container {
    .main-wrap {
      position: fixed;
      left: 0;
      right: 0;
      top: 92px;
      bottom: 88px;
      overflow-y: scroll;
      background-color: #fff;
    }
    .article-detail {
      .article-title {
        font-size: 40px;
        padding: 50px 32px;
        margin: 0;
        color: #3a3a3a;
      }
  
      .user-info {
        padding: 0 32px;
        .avatar {
          width: 70px;
          height: 70px;
          margin-right: 17px;
        }
        .van-cell__label {
          margin-top: 0;
        }
        .user-name {
          font-size: 24px;
          color: #3a3a3a;
        }
        .publish-date {
          font-size: 23px;
          color: #b7b7b7;
        }
        .follow-btn {
          width: 170px;
          height: 58px;
        }
      }
  
      .article-content {
        padding: 55px 32px;
        /deep/ p {
          text-align: justify;
        }
      }
    }
  
    .loading-wrap {
      padding: 200px 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
    }
  
    .error-wrap {
      padding: 200px 32px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      .van-icon {
        font-size: 122px;
        color: #b4b4b4;
      }
      .text {
        font-size: 30px;
        color: #666666;
        margin: 33px 0 46px;
      }
      .retry-btn {
        width: 280px;
        height: 70px;
        line-height: 70px;
        border: 1px solid #c3c3c3;
        font-size: 30px;
        color: #666666;
      }
    }
  
    .article-bottom {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      justify-content: space-around;
      align-items: center;
      box-sizing: border-box;
      height: 88px;
      border-top: 1px solid #d8d8d8;
      background-color: #fff;
      .comment-btn {
        width: 282px;
        height: 46px;
        border: 2px solid #eeeeee;
        font-size: 30px;
        line-height: 46px;
        color: #a7a7a7;
      }
      .van-icon {
        font-size: 40px;
        .van-info {
          font-size: 16px;
          background-color: #e22829;
        }
      }
    }
  }
  /deep/ .van-icon { //这样可以让子组件文章收藏的收藏图片变大
    font-size: 40px;
}
  </style>