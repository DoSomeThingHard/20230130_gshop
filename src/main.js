// 该文件是整个项目的入口文件
import Vue from 'vue' // 引入vue
import App from './App.vue' // 引入App组件，他是所有主键的父组件
Vue.config.productionTip = false  // 关闭Vue的生产提示

// 引入 router
import router from './router/index'



// 创建Vue的实例对象 -- vm
new Vue({
  render: h => h(App),
  router:router
}).$mount('#app')
