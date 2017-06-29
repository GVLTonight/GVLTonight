import Vue from 'vue'
import Router from 'vue-router'
import Gvl from '@/components/Gvl'
import About from '@/components/About'
import Testing from '@/components/Testing'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Gvl',
      component: Gvl
    }, {
      path: '/about',
      name: 'About',
      component: About
    }, {
      path: '/mary',
      name: 'Testing',
      component: Testing
    }
  ]
})
