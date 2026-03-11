import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/layout/home.vue'
import Category from '@/views/layout/category.vue'
import Cart from '@/views/layout/cart.vue'
import User from '@/views/layout/user.vue'
import { getInfo } from '@/utils/storage'
// 路由懒加载
const Login = () => import('@/views/login')
const Layout = () => import('@/views/layout/index.vue')
const MyOrder = () => import('@/views/myorder')
const Pay = () => import('@/views/pay/index.vue')
const ProDetail = () => import('@/views/prodetail')
const Search = () => import('@/views/search/index.vue')
const SearchList = () => import('@/views/search/list.vue')
const AddressList = () => import('@/views/pay/addresslist.vue')
const AddressEdit = () => import('@/views/pay/addressedit.vue')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        { path: '/home', component: Home },
        { path: '/category', component: Category },
        { path: '/cart', component: Cart },
        { path: '/user', component: User }
      ]
    },
    { path: '/myorder', component: MyOrder },
    { path: '/pay', component: Pay },
    // 动态路由传参，确认将来是哪个商品，路由参数中携带id
    { path: '/prodetail/:id', component: ProDetail },
    { path: '/search', component: Search },
    { path: '/searchlist', component: SearchList },
    { path: '/addresslist', component: AddressList },
    { path: '/addressedit', component: AddressEdit }
  ]
})
// 全局前置守卫 所有路由在真正到达之前都会经过全局前置守卫，只有它放行才会到达对应页面
// to: 到哪里去，到哪里去的完整路由信息对象（路径、参数）
// from: 从哪里来，从哪里来的完整路由信息对象（路径、参数）
// next(): 是否放行 next() 直接放行，放行到to要去的路径；next(路径) 进行拦截，拦截到next里面配置的路径
const authUrls = ['/pay', '/myorder']
router.beforeEach((to, from, next) => {
  // console.log(to, from, next)
  if (!authUrls.includes(to.path)) {
    next()
    return
  }
  const userInfo = getInfo()
  console.log(userInfo)
  if (userInfo.token) {
    next()
  } else {
    next('/login')
  }
})

export default router
