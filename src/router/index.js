import Vue from 'vue'
import Router from 'vue-router'
import TiledPictures from '@/components/TiledPictures'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TiledPictures',
      component: TiledPictures
    }
  ]
})
