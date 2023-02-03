// 该文件专门用于创建整个应用的路由器
import Vue from 'vue' // 引入vue
import vueRouter from 'vue-router'

// 引入组件
import Msite from '../pages/MSite/Msite'
import Search from '../pages/Search/Search'
import Order from '../pages/Order/Order'
import Profile from '../pages/Profile/Profile'
import Login from '../pages/Login/Login'
import UserInfo from '../pages/UserInfo/UserInfo'

Vue.use(vueRouter) 

// 创建并且暴漏一个路由器
const router = new vueRouter({
    // mode:'history',
    routes: [
        {
            path: '/msite', // 一级路由需要手动加上/
            component: Msite,
            meta:{
                showFooter: true
            }
        },
        {
            path: '/search',
            component: Search,
            meta:{
                showFooter: true
            }
        },
        {
            path: '/order',
            component: Order,
            meta:{
                showFooter: true
            }
        },
        {
            path: '/profile',
            component: Profile,
            meta:{
                showFooter: true
            }
        },
        {
            path: '/login',
            component: Login,
        },
        {
            path: '/userinfo',
            component: UserInfo
        },
        {
            path:'/',
            redirect:'/msite'
        }
    ]
})
export default router
