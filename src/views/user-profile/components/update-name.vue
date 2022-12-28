<template>
    <div class="update-name">
        <van-nav-bar
             title="设置昵称"
             left-text="取消"
             right-text="确定"
             @click-left="$emit('close')"
             @click-right="onConfirm" />
        <van-field
            v-model.time="localName"
            rows="2"
            autosize
            maxlength="7"
            type="textarea"
            placeholder="请输入用户昵称"
            show-word-limit
            />
    </div>
  </template>
  
  <script>
  import { updateUserProfile } from '@/api/user'
  export default {
    // 组件名称
    name: 'UpdateName',
    // 局部注册的组件
    components: {},
    // 组件参数 接收来自父组件的数据
    props: {
        value:{
            type:String,
            required:true
        }
    },
    // 组件状态值
    data () {
      return {
        localName:this.value
  
      }
    },
    // 计算属性
    computed: {},
    // 侦听器
    watch: {},
    created () { },
    mounted () { },
    // 组件方法
    methods: {
        async onConfirm(){
            try{
                if(!this.localName){
                    return this.$toast.fail('用户昵称不能为空')
                }
                this.$toast.loading({
                    message:'加载中...',
                    forbidClick : true,
                    duration: 0
                })
                await updateUserProfile({
                    name: this.localName
                })
                this.$toast.success('修改成功')
                this.$emit('input',this.localName)
                this.$emit('close')
            }catch(e) {
                this.$toast.fail('修改失败')
            }
        }
    }
  }
  </script>
  
  <style scoped lang="less">
  
  </style>