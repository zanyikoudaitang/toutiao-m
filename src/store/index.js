import Vue from 'vue'
import Vuex from 'vuex'
import {setItem,getItem} from '@/utils/storage'
Vue.use(Vuex)
const TOUTIAO_USER = "toutiao_user"
export default new Vuex.Store({
  state: {
    user:getItem('toutiao_user') ,//标识用户的token
    userName : '',
    
  },
  getters: {
  },
  mutations: {
    setUser(state,payload){
      state.user = payload

      setItem(TOUTIAO_USER,payload)
    },
    setUserName(state,payload){
      state.userName = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
