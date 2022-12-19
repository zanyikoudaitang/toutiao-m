<template>
    <div class="article-list">
        <!-- <p v-for="(item,index) in list" :key="index" >
            {{item.title}}
        </p> -->
		<!-- 下拉刷新 -->
		<van-pull-refresh
			v-model="isRefreshLoading"
			:success-text="successText"
			@refresh="onRefresh"
			>
		<!-- 列表数据 -->
			<van-list
			v-model="loading"
			:finished="finished"
			finished-text="没有更多了"
			:error.sync="error"
			error-text="请求失败，点击重新加载"
			@load="onLoad"
			>
			<!-- <van-cell v-for="(item,index) in list" :key="index" :title="item.title" /> -->
			<ArticleItem v-for="(item,index) in list" :article="item" :key="index"></ArticleItem>
			</van-list>

		</van-pull-refresh>
    
    </div>
  </template>
  
  <script>
  import {loadArticlesList} from '@/api/channel'
  import ArticleItem from '@/components/index.vue'
  export default {
    name: 'ArticleList',
    components: {ArticleItem},
    props: {//接收父组件传递过来的数据channel
      channel: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        list:[],
        loading: false,
        finished: false,
		error: false,
        timestamp:null,
      	isRefreshLoading: false,
		successText:'',
      }
    },
    computed: {},
    watch: {},
    created () {
       // this.loadArticlesLists()
    },
    mounted () {},
    methods: {
        async loadArticlesLists (){
            try{
                const ret = await loadArticlesList({
                    channel_id: this.channel.id,
                    timestamp:Date.now(),
                    with_top:0
                })
                this.list = ret?.data?.data?.results
                console.log(ret)
            }catch(e){
                console.log(e)
            }
        },


		//下拉刷新
		async onRefresh() {
				try{
					const ret = await loadArticlesList({
						channel_id: this.channel.id,
						timestamp:Date.now(),
						with_top:0
					})
					if(Math.random() > 0.5){
						JSON.parse('aaaa')
					}
					this.list.unshift(...(ret?.data?.data?.results || []))
					this.successText = `刷新成功，更新了${ret.data.data.results.length}条数据`
					this.$toast('刷新成功');
					this.isRefreshLoading = false;
				}catch(e){
					this.successText = `刷新失败，请重新尝试`
					this.isRefreshLoading = false;
				}
				
			},



		//加载数据
        async onLoad() {
            // 异步更新数据
            // setTimeout 仅做示例，真实场景中一般为 ajax 请求

			try{
				const ret = await loadArticlesList({
                    channel_id: this.channel.id,
                    timestamp:this.timestamp || Date.now(),
                    with_top:0
                })
				if(Math.random() > 0.5){
					throw new Error('出错了')
				}
				if(ret.data.data.results){
					this.list.push(...(ret?.data?.data?.results || []))
					this.timestamp = ret.data.data.pre_timestamp

				}else{
					this.finished = true
				}

				this.loading = false
				
			}catch(e){
				this.loading = false
				this.error = true

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

          },


    }
  }
  </script>
  
  <style scoped lang="less">
  .article-list{
	/*height: 79vh;*/
	/*height: calc(100vh - 46px - 180px - 50px) ;*/
	height: calc(100vh - 92px - 82px - 100px) ;
	overflow-y: auto;
  }
  </style>