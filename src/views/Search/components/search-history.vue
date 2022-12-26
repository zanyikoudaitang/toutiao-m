<template>
    <div>
        <van-cell title="历史记录">
        <template v-if="isDeleteShow">
        <!-- $forceUpdate() -->
            <span style="margin-right: 10px;" @click="searchHistories.splice(0)">全部删除</span>
            <span @click="isDeleteShow = false">完成</span>
        </template>
            <van-icon v-else name="delete-o" @click="isDeleteShow = true"></van-icon>
        </van-cell>
        <van-cell v-for="(history,index) in searchHistories" :key="history" :title="history" @click="onSearchItemClick(history,index)">
            <van-icon v-if="isDeleteShow" name="close" />
        </van-cell>
    </div>

</template>

<script>
export default {
    name:'searchHistory',
    props:{
        searchHistories:{
            type:Array,
            default:()=>[]
        }
    },
    data(){
        return {
            isDeleteShow:false, //标识当前是否删除状态 true表示是
        }
    },
    methods:{
        onSearchItemClick(history,index){
            if(this.isDeleteShow){
                this.searchHistories.splice(index,1);
            }else{
                // this.$parent.onSearch(history)
                this.$emit('search',history)
            }
        }
    }

}
</script>