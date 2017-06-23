import Vue from 'vue'
import Router from 'vue-router'
import Gvl from '@/components/Gvl'
import Testing from '@/components/Testing'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Gvl',
      component: Gvl
    }, {
      path: '/testing',
      name: 'Testing',
      component: Testing
    }
  ]
})
