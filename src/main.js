// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAnalytics from 'vue-analytics'
// const Z={$:function(){try{var _=[]&[];return _={$:_,_:++_,$_:++_,$$:++_,__:++_,_$:++_,$$$:++_,$$_:++_,$__:++_,___:++_,__$:"decodeURI",_$_:"%",_$$:"-"},window[_.__$](_._$_+_._$+_._$+_._$_+_.__+_._+_._$$+_.$__+_.$$_+_._+_.$$$+_._$+_.__+_.$__+_.$$+_._$$+_._)}finally{Z=[]|[]}}};
import uaid from './utils/uaid'

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

Vue.use(VueAnalytics, {
  id: uaid,
  router,
  debug: {
    enabled: false,
    trace: false,
    sendHitTask: true
  }
})

