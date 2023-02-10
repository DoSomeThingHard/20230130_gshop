/*
自定义过滤器模块
 */
// import moment from 'moment'
// import Vue from 'vue'

// Vue.filter('dateString', function (value, format) {
//   return moment(value).format(format || 'YYYY-MM-DD HH:mm:ss')
// })


import format from 'date-fns/format'
import Vue from 'vue'
Vue.filter('dateString', function(value, formatStr){
    return format(value, formatStr || 'yyyy-MM-dd HH:mm:ss')
})