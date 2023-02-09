// 该文件是整个项目的入口文件
import Vue from 'vue' // 引入vue
import App from './App.vue' // 引入App组件，他是所有主键的父组件
Vue.config.productionTip = false  // 关闭Vue的生产提示
// 引入 router
import router from './router/index'
import store from './store'

import {Button} from 'mint-ui'

import './mock/mockServer'    // 加载mockServer即可
import './filters'

import VueLazyload from 'vue-lazyload'
// or with options
const loadimage = require('./assets/loading.gif')
Vue.use(VueLazyload, {    // 增加了一个指令 v-lazy
  // preLoad: 1.3,
  // error: errorimage,
  loading: loadimage,   // 图片加载中的loading图片
  // attempt: 1
})

// 注册全局组件标签
Vue.component(Button.name, Button)  // <mt-button>

// 创建Vue的实例对象 -- vm
new Vue({
  render: h => h(App),
  router:router,
  store
}).$mount('#app')
