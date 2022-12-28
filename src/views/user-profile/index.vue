<template>
    <div class="user-profile">
        <!-- 导航栏 -->
        <van-nav-bar class="page-nav-bar" title="个人信息" left-arrow @click-left="$router.back()" left-left />
        <!-- /导航栏 -->
        <input type="file" hidden ref="file" @change='onFileChange'>
        <van-cell title="头像" is-link class="photo-cell" center @click="$refs.file.click()">
            <van-image class="avatar" fit="cover" round :src="userProfile.photo" />
        </van-cell>
        <van-cell title="昵称" :value="userProfile.name" is-link @click="isUpdateNameShow = true" />
        <van-cell title="性别" :value="userProfile.gender === 0 ? '男' : '女'" is-link @click="isUpdateGenderShow = true" />
        <van-cell title="生日" :value="userProfile.birthday" is-link @click="isUpdateBirthdayShow = true" />
        <van-popup v-model="isUpdateNameShow" :style="{ height: '100%' }" position="bottom">
            <updateName v-if="isUpdateNameShow" v-model="userProfile.name" @close="isUpdateNameShow = false">
            </updateName>
        </van-popup>

        <van-popup v-model="isUpdateGenderShow" :style="{ height: '100%' }" position="bottom">
            <updateGender v-if="isUpdateGenderShow" v-model="userProfile.gender" @close="isUpdateGenderShow = false">
            </updateGender>
        </van-popup>
        <van-popup v-model="isUpdateBirthdayShow" :style="{ height: '100%' }" position="bottom">
            <updateBirthday v-if="isUpdateBirthdayShow" v-model="userProfile.birthday"
                @close="isUpdateBirthdayShow = false"></updateBirthday>
        </van-popup>

        <van-popup v-model="isUpdatePhotoShow" style="height: 100%" position="bottom">
            <updatePhoto v-if="isUpdatePhotoShow" :img="img" @close="isUpdatePhotoShow = false" @update-photo="userProfile.photo = $event"></updatePhoto>
        </van-popup>

    </div>
</template>
  
<script>
import { getUserProfile } from '@/api/user'
import updateName from './components/update-name.vue'
import updateGender from './components/update-gender.vue'
import updateBirthday from './components/update-birthday.vue'
import updatePhoto from './components/update-photo.vue'
export default {
    // 组件名称
    name: 'UserProfile',
    // 局部注册的组件
    components: {
        updateName,
        updateGender,
        updateBirthday,
        updatePhoto
    },
    // 组件参数 接收来自父组件的数据
    props: {},
    // 组件状态值
    data() {
        return {
            userProfile: {},
            isUpdateNameShow: false,
            isUpdateGenderShow: false,
            isUpdateBirthdayShow: false,
            isUpdatePhotoShow: false,
            img: '',
        }
    },
    // 计算属性
    computed: {},
    // 侦听器
    watch: {},
    created() {
        this.loadUserProfile()
    },
    mounted() { },
    // 组件方法
    methods: {
        async loadUserProfile() {
            try {
                const ret = await getUserProfile()
                this.userProfile = ret.data.data
                console.log(ret)

            } catch (e) {
                this.$toast.fail('获取数据失败')
            }
        },
        onFileChange() {
            // 获取文件对象
            const file = this.$refs.file.files[0]
            // 基于文章对象获取 blob 数据
            this.img = window.URL.createObjectURL(file)
            //console.log(data)
            this.isUpdatePhotoShow = true

            // file-input 如果选了同一个文件不会触发 change 事件
            // 解决办法就是每次使用完毕，把它的 value 清空
            this.$refs.file.value = ''
        }
    }
}
</script>
  
<style scoped lang="less">
.user-profile {
    .avatar {
        width: 60px;
        height: 60px;
    }
}

.user-profile {
    .avatar {
        width: 60px;
        height: 60px;
    }

    .van-popup {
        background: #f5f7f9;
    }

    .photo-cell {
        .van-cell__value {
            display: flex;
            flex-direction: row-reverse;
        }
    }

    .img {
        display: block;
        max-width: 100%;
    }
}
</style>