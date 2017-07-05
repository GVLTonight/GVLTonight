// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'moment'
// import VueAnalytics from 'vue-analytics'
// import uaid from './utils/uaid'

Vue.use(VueAxios, axios, moment)

// Vue.config.productionTip = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

// Vue.use(VueAnalytics, {
//   id: uaid,
//   router,
//   debug: {
//     enabled: false,
//     trace: false,
//     sendHitTask: true
//   }
// })

