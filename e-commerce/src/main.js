// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import bootstrap from 'bootstrap'

import App from './App'
import router from './router'

Vue.use(VueAxios, axios, bootstrap)
axios.defaults.withCredentials = true
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  console.log('to:', to, 'from:', from, 'next:', next)
  if (to.meta.requiresAuth) {
    console.log('need to login')
    const api = `${process.env.APIPATH}/api/user/check`
    axios.post(api).then(response => {
      console.log(response.data)
      if (response.data.success) {
        next()
        // vm.$router.push('/')
      } else {
        next({
          path: '/login'
        })
      }
    })
  } else {
    next()
  }
})
