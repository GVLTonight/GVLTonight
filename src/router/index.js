import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/pages/Main'
import About from '@/components/pages/About'
import Testing from '@/components/pages/Testing'
// import Dossier from '@/utils/dossier'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      props: {
        variant: process.env.VARIANT
      }
    }, {
      path: '/about',
      name: 'About',
      component: About,
      props: {
        variant: process.env.VARIANT
      }
    }, {
      path: '/mary',
      name: 'Testing',
      component: Testing
    }
  ]
})
