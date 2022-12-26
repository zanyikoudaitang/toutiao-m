<template>
    <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item.art_id
" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import {getSearchResult} from '@/api/search'
export default {
  name: 'SearchResult',
  components: {},
  props: {
    searchText:{
      type : String,
      required : true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false,
      page : 1
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      try{
            const ret = await getSearchResult({
                  page:this.page,
                  per_page:20,
                  q:this.searchText
              })
            // console.log(ret)
            // 将拿到的数据放在数组列表的后面
            this.list.push(...(ret?.data?.data?.results) || [])

            this.loading = false
        // 加载下一页数据
        if(this.list.length >= ret.data.data.total_count){
            this.finished = true
        }else{
            this.page ++
        }
      }catch(e){
        this.error = true
        this.loading = false
      }




      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1)
      //   }

      //   // 加载状态结束
      //   this.loading = false

      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true
      //   }
      // }, 1000)
    }
  }
}
</script>

<style scoped lang="less"></style>

