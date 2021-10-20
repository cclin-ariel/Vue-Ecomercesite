// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import bootstrap from 'bootstrap'
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize,
  configure
} from 'vee-validate'
import TW from 'vee-validate/dist/locale/zh_TW.json'
import * as rules from 'vee-validate/dist/rules'

import App from './App'
import router from './router'
import './bus'
import currencyFilter from './filters/currency'
import dateFilter from './filters/date'
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule])
})

localize('zh_TW', TW)

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
})

Vue.use(VueAxios, axios, bootstrap)

axios.defaults.withCredentials = true
Vue.config.productionTip = false

Vue.component('Loading', Loading)
Vue.filter('currency', currencyFilter) // (filterName, importName)
Vue.filter('date', dateFilter) // (filterName, importName)

/* eslint-disable no-new */
new Vue({
  // i18n,
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  console.log('to:', to, 'from:', from, 'next:', next)
  if (to.meta.requiresAuth) {
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
