import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'home',
      path: '/',
      component: () => import('@/views/Home.vue'),
    },
    {
      name: 'favorite',
      path: '/favorite',
      component: () => import('@/views/Favorite.vue'),
    },
    {
      path: '/details/:id',
      component: () => import('@/views/Details.vue'),
    },
  ],
})
