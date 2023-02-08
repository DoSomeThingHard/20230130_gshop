import Vue from 'vue'
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

        async getShopRatings (context,callback){
            const result = await reqShopRatings()
            if(result.code === 0){
                const ratings = result.data
                context.commit('RECEIVE_RATINGS',ratings)
                // 数据更新了，通知一下
                callback && callback()
            }
        },

        async getShopInfo (context){
            const result = await reqShopInfo()
            if(result.code === 0){
                const info = result.data
                context.commit('RECEIVE_INFO',info)
            }
        },
         
        updateFoodCount(context, {isAdd, food}){
            if(isAdd){
                context.commit('INCREMENT_FOOD_COUNT',food)
            }else{
                context.commit('DECREMENT_FOOD_COUNT',food)
            }
        },
        clearCart(context){
            context.commit('CLEAR_CART')
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
        },
        INCREMENT_FOOD_COUNT(state, food){
            if(food.count){
                food.count++
            }else{
                // food.count = 1      // 新增的一个属性 这样写没数据绑定效果
                Vue.set(food,'count',1) // 让新增的属性 也有数据绑定
                // 将food添加到cartFoods中
                state.cartFoods.push(food)
            }
        },
        DECREMENT_FOOD_COUNT(state, food){
            if(food.count){ // 防止出现负数
                food.count--
                if(food.count === 0){
                    // 将food在cartFoods中移除
                    state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
                }
            }
        },
        CLEAR_CART(state){
            // 清除food中的count
            state.cartFoods.forEach(food => food.count = 0);
            // 清除购物车中的所有数据
            state.cartFoods = [];
        }
    },
    state: {
        goods:[],  // 商品列表
        ratings: [], // 商家评价列表
        info:{}, // 商家信息,

        cartFoods: [], // 购物车中食物的列表

    },
    getters: {
        totalCount(state){
            return state.cartFoods.reduce((preTotal, food) =>  preTotal + food.count ,0)
        },
        totalPrice(state){
            return state.cartFoods.reduce((preTotalPrice, food) => {
                return preTotalPrice + food.count * food.price
            },0)
        },
        positiveSize(state){
            return state.ratings.reduce((preTotal, rating) => preTotal + (rating.rateType===0?1:0), 0 )
        }
    }
}
