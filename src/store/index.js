// 该文件用于创建Vuex中最为核心的store

import Vue from 'vue' // 引入vue
// 引入Vuex
import Vuex from 'vuex'
import msiteOptions from './msite'
import loginOptions from './login'
import shopOptions from './shop'

Vue.use(Vuex) // 使用插件 下面创建vm的时候就可以传入$store了，vm和vc的实例对象就都有$store了。

// 创建store并暴露store
export default new Vuex.Store({
    modules:{
        loginOptions,
        msiteOptions,
        shopOptions
    }
})