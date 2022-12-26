<template>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <!-- <van-cell
        v-for="item in list"
        :key="item.com_id"
        :title="item.content"
      /> -->
      <CommentItem 
        v-for="item in list"
        :key="item.com_id"
        :comment="item"  
      ></CommentItem>
    </van-list>
  </template>
  
  <script>
  import {getComments} from '@/api/comment'
  import CommentItem from './comment-item.vue'
  export default {
    name: "CommentList",
    components: {
      CommentItem
    },
    props: { 
      source:{
          type: [Number,String,Object],
          required: true,
        },
      list:{
          type:Array,
          required: true,
      }
    },
    data() {
      return {
        offset: '',
        loading: false,
        finished: false,
        error:false
      };
    },
    computed: {},
    watch: {},
    created() {
      this.onLoad()
    },
    mounted() {},
    methods: {
      async onLoad() {
        // 异步更新数据
        // setTimeout 仅做示例，真实场景中一般为 ajax 请求
        try{
          const ret = await getComments({
            type:'a',
            source: this.source,
            offset : '',
            limit: 10
          })
          this.list.push(...(ret?.data?.data?.results || []))
          this.loading = false
          if(this.list.length >= ret.data.data.total_count){
            this.finished = true
          }else{
            this.offset = ret.data.data.last_id
          }
          //将父组件中的totalCommentCount赋值
          this.$parent.totalCommentCount = ret.data.data.total_count
          console.log(ret)
        }catch(e){
          this.error = true

          this.loading = false
          
        }





        /*setTimeout(() => {
          for (let i = 0; i < 10; i++) {
            this.list.push(this.list.length + 1);
          }
  
          // 加载状态结束
          this.loading = false;
  
          // 数据全部加载完成
          if (this.list.length >= 40) {
            this.finished = true;
          }
        }, 1000);*/
      }
    }
  };
  </script>
  
  <style scoped lang="less">
  </style>