import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/mine',
      name: 'mine',
      component: () => import('../views/MineView.vue')
    },
    {
      path: '/',
      name: 'main',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/MainView.vue'),
      redirect:'/home',
      children:[
        {
          path: '/home',
          name: 'home',
          component: HomeView
        },
        {
          path: '/mine',
          name: 'mine',
          component: () => import('../views/MineView.vue')
        }

      ]
    }
    ,
    {
      path: '/regist',
      name: 'regist',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/RegistView.vue')
    }
    ,
    {
      path: '/detail/:aid',
      name: 'detail',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/DetailView.vue')
    }
  ]
})

export default router
