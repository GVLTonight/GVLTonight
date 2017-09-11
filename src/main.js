import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'moment'
import VueAnalytics from 'vue-analytics'
import uaid from './utils/uaid'

Vue.use(VueAxios, axios, moment)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

if (process.env.NODE_ENV === 'production') {
  Vue.config.productionTip = true
  Vue.use(VueAnalytics, {
    id: uaid(process.env.VARIANT.uaid),
    router,
    debug: {
      enabled: false,
      trace: false,
      sendHitTask: true
    }
  })
}

// console.log('Log Expanded Object\n' + util.inspect(obj, false, null) + '\n');
