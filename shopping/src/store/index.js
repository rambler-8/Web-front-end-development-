import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import product_data from '../data'
const store = new Vuex.Store ({
	state: {
		productList: [],
		carList: []
	},
	getters: {

	},
	mutations: {
		// 添加商品列表
        setProductList (state, data) {
            state.productList = data;
            // console.log(state.productList);
        },
        //添加到购物车
        addtoCar(state, pro) {
            //最多只能传递两个参数
            // pro是一个对象 pro.id  pro.op
        	// 先判断购物车是否已有，如果有，数量+1
            const isAdded = state.carList.find(item => item.id === pro.id);
            if (isAdded) {
                isAdded.count ++;
            } else {
                // state.carList.push({
                //     id: pro.id,
                //     opIndex: pro.op, 
                //     count: 1
                // })
                let p = state.productList.find(item => item.id === pro.id);
                p.count = 1;
                p.opIndex = pro.op;
                state.carList.push(p);
            }
            console.log(state.carList);
        }
	},
	actions: {
		getProductList () {
            // 真实环境通过 ajax 获取，这里用异步模拟
            // setTimeout(() => {
                this.commit('setProductList', product_data.product);
                // console.log(1);
            // }, 500);
        }
	},
    mounted() {

    }
})

export default store