import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import About from '@/components/About'
import Testing from '@/components/Testing'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
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