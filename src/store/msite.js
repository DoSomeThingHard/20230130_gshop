import {myReqAddress} from '../api'
export default {
    namespaced:true,
    actions: {
        async getAddress(context){
            // 异步获取地址
            const result =  await myReqAddress()
            context.commit('RECEIVE_ADDRESS',{name:result})
        }
    },
    mutations: {
        RECEIVE_ADDRESS(state, address){
            state.address = address;
        }
    },
    state: {
        latitude: 40.10038, // 纬度
        longitude: 116.36867, // 经度
        address:{}, // 地址信息对象
        categorys:[],  // 分类数组
        shop:[],  // 商家信息
    },
    getters: {
    }
}
