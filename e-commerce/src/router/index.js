import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Login from '@/components/pages/login'
import Products from '@/components/pages/Products'
import OrderList from '@/components/pages/OrderList'
import CustomerOrders from '@/components/pages/CustomerOrders'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: 'login' // path
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: 'products',
          name: 'products',
          component: Products,
          meta: { requiresAuth: true } // router info
        },
        {
          path: 'orderList',
          name: 'orderList',
          component: OrderList,
          meta: { requiresAuth: true } // router info
        }
      ]
    },
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: 'customer_orders',
          name: 'customerOrders',
          component: CustomerOrders
        }
      ]
    }
  ]
})
