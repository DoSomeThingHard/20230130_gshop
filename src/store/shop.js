import {reqShopGoods, reqShopRatings, reqShopInfo} from '../api'
export default {
    namespaced:true,
    actions: {
        async getShopGoods (context, callback){
            const result = await reqShopGoods()
            if(result.code === 0){
                const goods = result.data
                context.commit('RECEIVE_GOODS',goods)
                // 数据更新了，通知一下
                callback && callback()
            }
        },

        async getShopRatings (context){
            const result = await reqShopRatings()
            if(result.code === 0){
                const ratings = result.data
                context.commit('RECEIVE_RATINGS',ratings)
            }
        },

        async getShopInfo (context){
            const result = await reqShopInfo()
            if(result.code === 0){
                const info = result.data
                context.commit('RECEIVE_INFO',info)
            }
        }
    },
    mutations: {
        RECEIVE_GOODS(state, goods){
            state.goods = goods;
        },
        RECEIVE_RATINGS(state, ratings){
            state.ratings = ratings;
        },
        RECEIVE_INFO(state, info){
            state.info = info
        }
    },
    state: {
        goods:[],  // 商品列表
        ratings: [], // 商家评价列表
        info:{}, // 商家信息
    },
    getters: {
    }
}
