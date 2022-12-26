<template>
  <div>
    <van-popup v-model="show" closeable close-icon-position="top-left" position="bottom" :style="{ height: '100%' }" />
  </div>
</template>

<script>
// 这个组件，负责频道编辑弹层内的所有逻辑
export default {
  name: 'ChannelEdit',
  props: {
    isChannelEditShow: Boolean
  },
  data() {
    return {
      show: this.isChannelEditShow
    }
  },
  watch: {
    // 这个处理的是channel-edit父组件的数据变化，去传递更新给van-popup子组件的show
    isChannelEditShow(value) {
      this.show = value
    },
    // 子组件van-popup内部会更新show变量，需要同步给父channel-edit及home/index.vue组件
    show(value) {
      this.$emit('update-popup-show', value)
    }
  }
}
</script>

<style scoped></style>
