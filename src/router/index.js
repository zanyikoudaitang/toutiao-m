import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:'/login',
    name: 'login',
    component: () => import('@/views/Login')
  },
  {
    path:"/",
    component: () => import('@/views/Layout'),
    children:[
      {
        path:'',
        name:'Home',
        component: () => import('@/views/Home')
      },{
        path:'/qa',
        name:'qa',
        component: () => import('@/views/qa')
      },{
        path:'/video',
        name:'video',
        component: () => import('@/views/video')
      },{
        path:'/my',
        name:'my',
        component: () => import('@/views/my')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
