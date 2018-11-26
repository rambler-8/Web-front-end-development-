import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import product from '@/components/product'
import productDetail from '@/components/productDetail'
import car from '@/components/car'
import commonnav from '@/components/commonnav'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
    	path: '/product',
    	name: 'product',
    	component: product
    },
    {
      path: '/productDetail/:id',
      name: 'productDetail',
      component: productDetail
    },{
      path: '/car',
      name: 'car',
      component: car
    },{
      path: '/nav',
      name: 'commonnav',
      component: commonnav
    }
  ]
})
