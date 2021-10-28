import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Login from '@/components/pages/login'
import Products from '@/components/pages/Products'
import OrderList from '@/components/pages/OrderList'
import CouponList from '@/components/pages/CouponList'
import CustomerOrders from '@/components/pages/CustomerOrders'
import CustomerCheckout from '@/components/pages/CustomerCheckout'

import CustomerHome from '@/components/CustomerHome'

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
          path: 'order_list',
          name: 'orderList',
          component: OrderList,
          meta: { requiresAuth: true } // router info
        },
        {
          path: 'coupon_list',
          name: 'couponList',
          component: CouponList,
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
        },
        {
          path: 'customer_checkout/:orderId',
          name: 'customerCheckout',
          component: CustomerCheckout
        }
      ]
    },
    { path: '/customer_home', name: 'CustomerHome', component: CustomerHome }
  ]
})
