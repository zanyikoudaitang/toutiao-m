<template>
    <div class="login-container">
        <van-nav-bar class="page-nav-bar" title='登录' :border="false">
            <van-icon
        slot="left"
        name="cross"
        @click="$router.back()"
      />
        </van-nav-bar>
        <van-form @submit="onSubmit" ref="form">
            <van-field v-model="mobile" name="mobile" placeholder="请填写手机号" :rules="rules.mobile">
                <template #left-icon>
                    <i class="toutiao toutiao-shouji"></i>
                </template>
            </van-field>

            <van-field v-model="code" type="password" name="code" placeholder="请输入验证码" :rules="rules.code">
                <template #left-icon>
                    <i class="toutiao toutiao-yanzhengma"></i>
                </template>

                <template #button>
                    <van-count-down v-if="isCountdown" :time="5 * 1000" @finish="isCountdown = false" />
                    <van-button v-else class="send-sms-btn" round size="small" type="button"
                        @click="onSendSms">发送验证码</van-button>
                </template>
            </van-field>

            <div class="login-btn-wrap">
                <van-button class="login-btn" round block type="info" native-type="submit">提交</van-button>
            </div>
        </van-form>



    </div>
</template>
  
<script>
import { login , getSmsCode } from '@/api/login'

export default {
    name: 'LoginIndex',
    components: {},
    props: {},
    data() {
        return {
            isCountdown: false,
            mobile: '',
            code: '',
            rules: {
                mobile: [
                    { required: true, message: '请填写手机号' },
                    { pattern: /^1[3-9]\d{9}$/, message: '请填写正确的手机号' }
                ],
                code: [
                    { required: true, message: '请输入验证码' },
                    { pattern: /^\d{6}$/, message: '请填写正确的验证码' }
                ]
            }

        }
    },
    computed: {
    },
    watch: {},
    created() { },
    mounted() { },
    methods: {
        async onSubmit(values) {
            console.log('submit', values);
            this.$toast.loading({
                message: '加载中...',
                forbidClick: true,
                duration: 0
            });
            try {
                const res = await login(values)
                this.$toast.success("登录成功");
                this.$store.commit('setUser',res.data.data)
                this.$store.commit('setUserName',this.mobile)
                this.$router.back()
                console.log(res)
            } catch (err) {
                //if(err && err.response && err.response.status === 400){
                if (err?.response?.status === 400) {
                    this.$toast.fail("验证码错误，请重新登录");
                    //alert("验证码错误，请重新输入")
                } else {
                    //alert("网络错误")
                    this.$toast.fail("网路错误");

                }
                console.log(err)
            }
        },
        async onSendSms() {

            
            // 1. 校验手机号
            try {
                const ret =await this.$refs.form.validate('mobile').catch(err => err) 
                if(ret)return this.$toast.fail(ret.message)


                this.isCountdown = true
                await getSmsCode (this.mobile)
                this.$toast.success("验证码发送成功");

            } catch (err) {
                console.log('验证失败', err)
                this.$toast.fail("发送失败，请重新发送")
                this.isCountdown = false
            }

            // 2. 验证通过，显示倒计时
            this.isCountDownShow = true
        }

    },

}
</script>
  
<style scoped lang="less">
.van-nav-bar {
    background-color: #ff0;

    ::v-deep .van-nav-bar__title {
        color: #fff;
    }
}

.send-sms-btn {
    width: 162px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
}

.login-btn-wrap {
    padding: 53px 33px;

    .login-btn {
        background-color: #6db4fb;
        border: none;
    }
}
</style>