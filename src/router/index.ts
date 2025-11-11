import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import GenresView from '@/views/GenresView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/genres',
    name: 'Genres',
    component: () => import('@/views/GenresView.vue'),
  },

  // router/index.ts
  {
    path: '/movie/:id', // добавьте этот маршрут
    name: 'Movie',
    component: () => import('@/views/MovieView.vue'),
  },
  {
    path: '/genre/:genre', // ДОБАВЛЯЕМ ЭТОТ МАРШРУТ
    name: 'genre-movies',
    component: () => import('@/views/GenreMoviesView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router // Default export
