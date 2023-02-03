// 该文件是整个项目的入口文件
import Vue from 'vue' // 引入vue
import App from './App.vue' // 引入App组件，他是所有主键的父组件
Vue.config.productionTip = false  // 关闭Vue的生产提示
// 引入 router
import router from './router/index'
import store from './store'

import {Button} from 'mint-ui'

// 注册全局组件标签
Vue.component(Button.name, Button)  // <mt-button>

// 创建Vue的实例对象 -- vm
new Vue({
  render: h => h(App),
  router:router,
  store
}).$mount('#app')
