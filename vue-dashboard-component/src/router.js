import Vue from 'vue'
import Router from 'vue-router'
// eslint-disable-next-line
import Index from './components/Index.vue'
// eslint-disable-next-line
import Product from './components/Product.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Index
    },
    {
      path: '/product/:id?',
      name: 'product',
      component: Product,
      props: true
    }
  ]
})
