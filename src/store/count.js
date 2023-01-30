export default {
    namespaced:true,
    actions: {
        increment(context, value) {
            context.commit('Increment', value)
        },
        decrement(context, value) {
            // 还可以继续调用其他的方法
            context.dispatch('demo1', value)
        },
        demo1(context, value) {
            console.log('处理很多事情')
            context.commit('Decrement', value)
        },
        incrementOdd(context, value) {
            if (context.state.sum % 2) {
                context.commit('Increment', value)
            }
        },
        incrementWait(context, value) {
            setTimeout(() => {
                context.commit('Increment', value)
            }, 500);
        }
    },
    mutations: {
        Increment(state, value) {
            state.sum += value
        },
        Decrement(state, value) {
            state.sum -= value
        },
    },
    state: {
        sum: 0,
        school: '东软',
        subject: '前端',
    },
    getters: {
        bigSum(state) {
            return state.sum * 10
        }
    }
}
