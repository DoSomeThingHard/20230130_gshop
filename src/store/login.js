import {reqUser} from '../api'
export default {
    namespaced:true,
    actions: {
        recordUserToken(appToken){
            console.log('保存token'+appToken)
            context.commit('RECEIVE_TOKEN',appToken)
        },
        async getUserInfo(context){
            console.log('获取用户信息')
            // 异步获取用户信息
            const result =  await reqUser()
            console.log(result)
            context.commit('RECEIVE_USER_INFO',result.result)
        },
        logOut(context){
            console.log('退出登录')
            context.commit('RECEIVE_USER_INFO',{})
        }
    },
    mutations: {
        RECEIVE_TOKEN(state, appToken){
            state.appToken = appToken;
        },
        RECEIVE_USER_INFO(state, userInfo){
            state.userInfo = userInfo;
        }
    },
    state: {
        userInfo:{},  // 用户信息
        appToken:''   // 记录登录的token
    },
    getters: {
    }
}
