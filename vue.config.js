module.exports = {
    pages:{
        index: {
            entry: 'src/main.js',
        },
    },
    lintOnSave: false, // 关闭语法检查
    // devServer:{
    //     proxy: 'https://k.autohome.com.cn'
    // }
    devServer:{
        proxy:{
            '/qianzui':{
                target:'https://k.autohome.com.cn',
                pathRewrite:{'^/qianzui':''},
                ws: true, // 用于支持websocket
                changeOrigin: true // 是否告诉服务器真实的请求 false就是我们代理服务器的地址 true就是target 用于控制请求头中的Host值。
            },
            '/myBlibli':{
                target:'https://s.search.bilibili.com',
                pathRewrite:{'^/myBlibli':''},
            },
            '/api':{
                // 我们使用这个当做测试服务器
                target:'http://yfbgserver.fi.com'
            }
        }
    }
}