<template>
    <div class="home-container">
    <van-nav-bar class="page-nav-bar" fixed>
        <!--增加一个名字为title的插槽 -->
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        to='/Search'
      >搜索</van-button>
    </van-nav-bar>
    <!-- /导航栏 -->
    <van-tabs v-model="active" class="channel-tabs" swipeable animated sticky>
    <template #nav-right>
      <div class="hamburger-btn" @click="isChannelEditShow = true">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </template>
    <van-tab
        :title="channel.name"
        v-for="channel in channels"
        :key="channel.id">
      
      <ArticleList :channel="channel" />
      </van-tab>
    </van-tabs>


    <!-- 频道编辑 -->
    <van-popup
      v-model="isChannelEditShow"
      position="right"
      closeable
      close-icon-position="top-left"
      :style="{ height: '100%' }"
    >
    <ChannelEdit :active="active" :myChannels="channels" @updateActive="updateActive" />
    </van-popup>
  </div>
  </template>
  
  <script>
  import {getUserChannels} from '@/api/login'
  import { mapState } from 'vuex'
  import { getItem, setItem } from '@/utils/storage'
  import ArticleList from './components/article-list.vue'
  import ChannelEdit from './components/channel-edit.vue'

  export default {
    name: 'HomeIndex',
    components: {
      ArticleList,
      ChannelEdit
    },
    props: {},
    data () {
      return {
        active:0,
        channels:[],
        isChannelEditShow: false
      }
    },
    computed: {
      ...mapState(['user'])
    },
    watch: {},
    created () {
      this.loadUserChannels()
    },
    mounted () {},
    methods: {
      async loadUserChannels (){
        try{
          const localUserChannels = getItem('TOUTIAO-CHANNELS')
          if(this.$store.state.user || !localUserChannels){
            const ret = await getUserChannels();
            this.channels = ret.data.data.channels;
          }else{
            this.channels = localUserChannels
          }
          
        }catch(e){
          console.log(e)
          this.$toast.fail('获取用户频道列表失败')
        }

      },
      updateActive(index,flag=false){
        //console.log(index)
        this.active = index
        this.isChannelEditShow = flag

      },
    }
  }
  </script>
  
  <style scoped lang="less">
  .home-container {
  padding-bottom: 100px;
  padding-top: 88px;
  /*padding-top: 174px;*/
  /deep/ .van-nav-bar__title { 
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
}
/deep/ .channel-tabs {  
    .van-tabs__wrap {   //这里只需要给父节点channel-tabs添加/deep/,这样下边的子节点都会生效
      height: 82px;
      /*top: 92px;*/
      /*
      position: fixed;
      left: 0;
      z-index: 1;
      width: 100vw;
      right:66px;*/
    }

    .van-tab {  //这个比较特殊，我们在结构中写有van-tab标签，但是在渲染的时候没有data标记，所以也需要deep
      border-right: 1px solid #edeff3;
      min-width: 200px;
      font-size: 30px;
      color: #777777;
    }

    .van-tab--active {   //这里只需要给父节点channel-tabs添加/deep/,这样下边的子节点都会生效
      color: #333333;
    }

    .van-tabs__nav {   //这里只需要给父节点channel-tabs添加/deep/,这样下边的子节点都会生效
      padding-bottom: 0;
    }

    .van-tabs__line {   //这里只需要给父节点channel-tabs添加/deep/,这样下边的子节点都会生效
      bottom: 8px;
      width: 31px !important;
      height: 6px;
      background-color: #3296fa;
    }
}

.placeholder {//占位元素为了解决最后一个tab标签被汉堡盖住问题（看下边的图）
  flex-shrink: 0;//此元素不参与flex的
  width: 66px;
  height: 82px;
}

.hamburger-btn {
  position: fixed;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 66px;
  height: 82px;
  background-color: #fff;
  opacity: 0.902;
  i.toutiao {
    font-size: 33px;
  }
  &:before { //找到父节点，添加伪元素（这个是汉堡按钮与tab之间的一个竖线）
    content: "";
    position: absolute;
    left: 0;
    width: 2px;//在模拟器上看不到（手机上没问题），如果想看到改为2px
    height: 100%;
    background-image: url(~@/assets/gradient-gray-line.png);
    background-size: contain;
  }
}
  
  
  </style>