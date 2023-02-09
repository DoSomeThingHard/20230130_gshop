// 该文件专门用于创建整个应用的路由器
import Vue from 'vue' // 引入vue
import vueRouter from 'vue-router'

// 引入组件
// import Msite from '../pages/MSite/Msite'
// import Search from '../pages/Search/Search'
// import Order from '../pages/Order/Order'
// import Profile from '../pages/Profile/Profile'

const Msite = ()=> import('../pages/MSite/Msite')
const Search = ()=> import('../pages/Search/Search')
const Order = ()=> import('../pages/Order/Order')
const Profile = ()=> import('../pages/Profile/Profile')

import Login from '../pages/Login/Login'
import UserInfo from '../pages/UserInfo/UserInfo'
import Shop from '../pages/Shop/Shop'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo'
import ShopRating from '../pages/Shop/ShopRating/ShopRating'

Vue.use(vueRouter) 

// 创建并且暴漏一个路由器
const router = new vueRouter({
    // mode:'history',
    routes: [
        {
            path: '/msite', // 一级路由需要手动加上/
            component: Msite, // 返回路由组件的函数， 只有执行此函数才会加载路由组件，这个函数在第一次请求对应的路由路径的时候才会被执行
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
            path:'/shop',
            component: Shop,
            children:[
                {
                    path:'/shop/goods',
                    component: ShopGoods
                },
                {
                    path:'/shop/rating',
                    component: ShopRating
                },
                {
                    path:'/shop/info',
                    component: ShopInfo
                },
                {
                    path:'',
                    redirect:'/shop/goods'
                }
            ]
        },
        {
            path:'/',
            redirect:'/msite'
        }
    ]
})
export default router
