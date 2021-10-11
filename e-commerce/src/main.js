// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import bootstrap from 'bootstrap'
import VeeValidate from 'vee-validate'
// import zhTWValidate from 'vee-validate/dist/locale/zh_TW' // 中文化
// import VueI18n from 'vue-i18n'

import App from './App'
import router from './router'
import './bus'
import currencyFilter from './filters/currency'

Vue.use(VueAxios, axios, bootstrap)

// Vue.use(VueI18n)
// const i18n = new VueI18n({
//   locale: 'zhTWValidate'
// })
Vue.use(VeeValidate, {
  events: 'input|blur'
  // i18n,
  // dictionary: {
  //   zhTWValidate
  // }
})

axios.defaults.withCredentials = true
Vue.config.productionTip = false

Vue.component('Loading', Loading)
Vue.filter('currency', currencyFilter) // (filterName, importName)

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
