<template>
  <div class="my-container">

    <!-- 已登录头部 -->
    <div v-if="user" class="header user-info">
      <div class="base-info">
        <div class="left">
          <!--
		image: 增强版的 img 标签，提供多种图片填充模式，支持图片懒加载、加载中提示、加载失败提示 
		round: 设置图片变圆
		fit="cover" ： fit填充模式：	cover保持宽高缩放图片，使图片的短边能完全显示出来，裁剪长边
		  -->
          <van-image class="avatar" :src="userList.photo" round fit="cover" />
          <span class="name">{{ userList.name }}</span>
        </div>
        <div class="right">
          <van-button size="mini" round to="/user/profile">编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{ userList.art_count }}+</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userList.fans_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userList.follow_count }}+</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userList.like_count }}+</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- /已登录头部 -->

    <!-- 未登录头部 -->
    <div v-else class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="@/assets/mobile.png" alt="">
        <span class="text">登录 / 注册</span>
      </div>
    </div>

    <!-- 导航 -->
    <van-grid class="grid-nav mb-9" :column-num="2" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>


    <div class="grid-nav"></div>
    <van-cell v-if="user" title="消息通知" is-link url="" />
    <van-cell title="实名认证" is-link url="" />
    <van-cell v-if="user" title="用户反馈" is-link url="" />
    <van-cell title="系统设置" is-link url="" />
    <van-cell class="mb-9" title="小智同学" is-link />
    <van-cell v-if="user" class="logout-cell" clickable title="退出登录" @click="logout" />

  </div>
</template>

<script>
import { mapState } from "vuex"
import { getUserInfo , login } from "@/api/login"

export default {
  name: 'MyIndex',

  components: {},
  props: {},
  data() {
    return {
      userList: {}
    }
  },
  computed: {
    ...mapState(['user','userName'])
  },
  watch: {},
  async created() {
    this.loadUserInfo()
  },
  mounted() { },
  methods: {
    async loadUserInfo() {
      try {
        if (this.user) {
          const ret = await getUserInfo()
          this.userList = ret.data.data

        }
      } catch (e) {
        if(e?.response?.status === 401){
          login('18625949424')
        }
        console.log(e)

      }
    },
    async logout() {
      const ret = await this.$dialog.confirm({
        title: '提示',
        message: '您确定要退出吗？'
      }).catch(err => err)
      if (ret === 'cancel') return

      this.$store.commit('setUser', null)
    }
  }
}
</script>
  
<style scoped lang="less">
.my-container {
  .header {
    height: 361px;
    background: url("~@/assets/banner.png");
    background-size: cover;
  }

  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;

    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }

      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }
}

.user-info {
  .base-info {
    height: 231px;
    padding: 76px 32px 23px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      display: flex;
      align-items: center;

      .avatar {
        width: 132px;
        height: 132px;
        border: 4px solid #fff;
        margin-right: 23px;
      }

      .name {
        font-size: 30px;
        color: #fff;
      }
    }
  }

  .data-stats {
    display: flex;

    .data-item {
      height: 130px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #fff;

      .count {
        font-size: 36px;
      }

      .text {
        font-size: 23px;
      }
    }
  }
}


.grid-nav {
  .grid-item {
    height: 141px;

    i.toutiao {
      font-size: 45px;
    }

    .toutiao-shoucang {
      color: #eb5253;
    }

    .toutiao-lishi {
      color: #ff9d1d;
    }

    span.text {
      font-size: 28px;
    }
  }
}

.logout-cell {
  text-align: center;
  color: #d86262;
}

.mb-9 {
  margin-bottom: 9px;
}
</style>