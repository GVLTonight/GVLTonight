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
  const Constructor = Vue.extend(Main)
  const vm = new Constructor({router: mockRouter}).$mount()
  const ajax = vm.$data.variantObject.ajax
  const regex = /(https?:\/\/)?(www\.)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)|(https?:\/\/)?(www\.)?(?!ww)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/
  // console.log(vm.$data.variantObject)
  it('variant should be defined', () => {
    expect(Object.keys(vm.$data.variantObject))
      .to.not.equal(0)
  })
  it('should render correct contents', () => {
    expect(vm.$el.querySelector('.venue em').textContent)
      .to.equal(`live music aggregator for ${vm.$data.variantObject.city} ${vm.$data.variantObject.state}`)
  })
  it('should be using the correct API routes', () => {
    ajax.forEach(x => {
      expect(regex.test(x))
        .to.equal(true)
    })
  })
})
