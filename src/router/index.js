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
  },
  {
    path:'/Search',
    name:'search',
    component: () => import('@/views/Search')
  },
  {
    path: '/article/:articleId', //需要传递文章id
    name: 'article',
    component: () => import('@/views/article'),
     // 开启 Props 传参，说白了就是把路由参数映射到组件的 props 数据中
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
