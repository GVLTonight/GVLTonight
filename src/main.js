// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import VueAnalytics from 'vue-analytics'
// import uaid from './utils/uaid'

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

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

