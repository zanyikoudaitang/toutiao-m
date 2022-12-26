<template>
    <div class="search-container">
        <form class="search-form" action="/">
            <van-search
                v-model.trim="searchText"
                show-action
                background="#2892ff"
                placeholder="请输入搜索关键词"
                @focus="isResultShow=false"
                @search="onSearch"
                @cancel="onCancel"
            />
        </form>
            <SearchResult :search-text="searchText" v-if="isResultShow"></SearchResult>
            <SearchSuggestion v-else-if="searchText" :search-text="searchText" @search="onSearch" />

            <SearchHistory  v-else :searchHistories="searchHistories" @search="onSearch"></SearchHistory>
        
    </div>
</template>


<script>
import SearchHistory from './components/search-history.vue'
import SearchSuggestion from './components/search-suggestion.vue'
import SearchResult from './components/search-result.vue'
import {Toast} from 'vant'
import {setItem,getItem} from '@/utils/storage'
export default{
    name:"SearchIndex",
    data() {
    return {
      searchText: '',
      isResultShow : false,
      searchHistories:getItem('TOUTIAO-HISTORIES') || [] //标识历史记录
    };
  },
  components:{
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  methods: {
    onSearch(val) {
      if(!val) return 
      this.searchText = val;
      this.isResultShow = true

      // console.log(111,val)
      const index = this.searchHistories.indexOf(val)

      if(index > -1){
        this.searchHistories.splice(index,1)
      }
      this.searchHistories.unshift(val)

      this.searchHistories = this.searchHistories.slice(0,10)

    },
    onCancel() {
      Toast('取消');
      this.$router.back()
    },
  },
  watch:{
    searchHistories(newVal){
      setItem('TOUTIAO-HISTORIES', newVal)
    }
  }
}
</script>


<style scoped lang="less">
.search-container {
  // padding-top: 108px;
  .van-search__action {
    color: #fff;
    &:active{
      background-color:rgb(40, 146, 255) ;
    }
  }
  .search-form {
		position: sticky;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1;
	}
}

</style>

