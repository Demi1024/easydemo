import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/plat',
      name: 'pingtest',
      component: () => import('@/components/platform')
    },
    {
      path: '/pageTwo',
      name: 'mytest',
      component: () => import('@/components/mytest')
    }
  ]
})
