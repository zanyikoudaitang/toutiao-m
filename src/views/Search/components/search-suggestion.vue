<template>
    <div class="search-suggestion">
        <van-cell v-for="item in suggestions"  @click="$emit('search',item)" :key="item" icon="search" >
            <template #title>
            <!-- @click="$parent.onSearch(item)" -->
                <div v-html="highlight2(item)" />
            </template>
        </van-cell>
    </div>

</template>
<script>
import {getSearchSuggestions} from '@/api/search'
import {debounce} from 'lodash'
export default {
    name: 'SearchSuggestion',
    props:{
        searchText :{
            type:String,
            required:true,
            // flag:false,
            // timer : null,

        }
    },
    data(){
        return{
            suggestions:[]
        }
    },
    created(){
        // this.loadSearchSuggestions()
    },
    methods:{
        async loadSearchSuggestions(){
            try{
                // if(this.timer){
                //     clearTimeout(this.timer)
                // }
                // this.timer = setTimeout( async()=>{
                    const {data:{data:{options}}} = await  getSearchSuggestions({
                        q:this.searchText
                    })
                    this.suggestions = options.filter(f => f)
                // console.log(options)
                // },300)
                
            }catch(e){
                console.log(e)
            }
        },
        highlight(item){
            console.log(item)

            return item.split(this.searchText).join(`<span style='color:red'>${this.searchText}</span>`)
        },
        highlight2(item){
            // console.log(item)

            return item.replace(RegExp(this.searchText,'g'),`<span style='color:red'>${this.searchText}</span>`)
        }

    },
    watch:{
        searchText:{
            handler : debounce(function(){
                this.loadSearchSuggestions()
            },200),
            immediate:true
        },
        
    }
}

</script>



