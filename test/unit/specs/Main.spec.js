import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'

const mockRouter = new Router({
  routes: [
    {
      path: '/',
      name: 'Main'
    }
  ]
})

describe('Main.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Main)
    const vm = new Constructor({router: mockRouter}).$mount()
    expect(vm.$el.querySelector('.venue em').textContent)
      .to.equal('live music aggregator for greenville sc')
  })
})
