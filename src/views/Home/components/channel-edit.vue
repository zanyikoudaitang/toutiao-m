<template>
	<div class="channel-edit">
	  <van-cell title="我的频道" class="title-text" :border="false">
		<template>
		  <van-button type="default" round class="edit-btn" @click="isEdit = !isEdit">
		  	{{ isEdit ? '完成' : '编辑'}}
		  </van-button>
		</template>
	  </van-cell>
	  <van-grid class="my-grid" :gutter="10">
		<van-grid-item 
			:icon="isEdit && !fixedChannels.includes(item.id) ? 'clear' : ''" 
			v-for="(item,index) in myChannels" 
			:key="item.id" 
			:class="{active: index === active}" 
			:text="item.name" 
			@click="onMyChannelClick(item,index)"
			class="grid-item" />
		
	  </van-grid>
  
	  <van-cell title="推荐频道" class="title-text" :border="false"> </van-cell>
	  <van-grid class="recommend-grid" :gutter="10">
		<van-grid-item 
			v-for="(item,index) in recommendChannels"
			icon="plus" 
			:key="item.id" 
			class="grid-item" 
			:text="item.name"
			@click="onAddChannel(item)" />
	  </van-grid>
	</div>
  </template>
  
  <script>
  import {mapState} from 'vuex'
  import {setItem} from '@/utils/storage'
  import {getAllChannel , addUserChannel , deleteUserChannel} from "@/api/channel"
  // 这个组件，负责频道编辑弹层内的所有逻辑
  export default {
	name: 'ChannelEdit',
	created(){
		this.loadAllChannel()
	},
	data(){
		return{
			allChannels:[],
			isEdit:false, //标识是否处于编辑状态
			fixedChannels:[0],//标识不能删除的项的id
		}
	},
	props:{
		myChannels:{
			type:Array,
			required:true
		},
		active: {
			type: Number,
			required: true
		}
	},
	methods:{
		async loadAllChannel(){
			try{
				const ret = await getAllChannel()
				this.allChannels = ret.data.data.channels
				//console.log(ret)
			}catch(e){
				console.log(e)

			}
		},
		async onAddChannel(channel){
			this.myChannels.push(channel)
			if(this.user){
				try{
					await addUserChannel({
						channels:[{
							id: channel.id,
							seq:this.myChannels.length
						}]
					})
					this.$toast('添加成功')
				}catch(e){
					this.$toast('保存失败')
				}
			}else{
				setItem('TOUTIAO-CHANNELS',this.myChannels)
			}

		},
		onMyChannelClick(item,index){
			if(this.isEdit){
				if(this.fixedChannels.includes(item.id)) return 

				this.myChannels.splice(index,1)

				//解决bug因为当删除的哪一项是active前项时 索引会发生改变
				//因此需要在删除前一项后将当前的active-1
				if(index <= this.active){
					this.$emit("updateActive", this.active - 1 , true)
				}
				this.deleteChannel(item)



			}else{
				this.$emit('updateActive',index)
			}
		},
		async deleteChannel(channel){
			if(this.user){
				try{
					await deleteUserChannel(channel.id)
					this.$toast.success('删除成功')
				}catch(e){
					this.$toast.fail('删除失败')
					console.log(e)
				}

			}else{
				setItem('TOUTIAO-CHANNELS',this.myChannels)
			}
		}
		
	},
	computed:{
		recommendChannels(){
			const {allChannels,myChannels} = this
			const target = []
			allChannels.forEach(allChannelItem => {
				const isExist = myChannels.some(myChannelItem => myChannelItem.id === allChannelItem.id)
				if(!isExist){
					target.push(allChannelItem)
				}
			})

			return target
		},
		recommendChannels2() {
			return this.allChannels.filter(
				allChannelItem => !this.myChannels.some(myChannelItem => myChannelItem.id === allChannelItem.id)
			)
   		},

		...mapState(['user'])
		

		




	}
  }
  </script>
  
  <style scoped lang="less">
  .channel-edit {
	padding: 85px 0;
  
	.title-text {
	  font-size: 32px;
	  color: #333333;
	}
  
	.edit-btn {
	  width: 134px;
	  height: 48px;
	  font-size: 26px;
	  color: #f85959;
	  border: 1px solid #f85959;
	}
  }
  
  // 公共的grid-item样式
  /deep/ .grid-item {
	width: 160px;
	height: 86px;
	margin-bottom: 10px;
	&.active .van-grid-item__text{
		color: red !important;
	}
	.van-grid-item__content {
	  white-space: nowrap;
	  background-color: #f4f5f6;
	  .van-grid-item__text {
		font-size: 28px;
		color: #222;
	  }
	}
  }
  
  // 推荐频道下的grid-item样式
  /deep/ .recommend-grid {
	.grid-item {
	  .van-grid-item__content {
		flex-direction: row;
		.van-icon-plus {
		  font-size: 28px;
		  margin-right: 6px;
		}
		.van-grid-item__text {
		  margin-top: 0;
		}
	  }
	}
  }
  
  // 我的频道下的grid-item样式
  /deep/ .my-grid {
	.grid-item {
	  .van-icon-clear {
		position: absolute;
		right: -10px;
		top: -10px;
		font-size: 30px;
		color: #cacaca;
		z-index: 2;
	  }
	}
  }
  </style>
  