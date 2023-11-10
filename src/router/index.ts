import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/AuthStore'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import BookDetailView from '@/views/BookDetailView.vue'
import { mapStores } from 'pinia'
const BookListView = () => import('@/views/BookListView.vue')
const BookEditView = () => import('@/views/BookEditView.vue')
const BookNewView = () => import('@/views/BookNewView.vue')
const TheLoginView = () => import('@/views/TheLoginView.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/books',
    name: 'Books',
    component: BookListView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },

  {
    path: '/books/:isbn',
    name: 'BookDetailView',
    component: BookDetailView
  },
  {
    path: '/books/:isbn/edit',
    name: 'BookEditView',
    component: BookEditView
  },
  {
    path: '/books/create',
    name: 'BookNewView',
    component: BookNewView
  },
  {
    path: '/login',
    name: 'TheLoginView',
    component: TheLoginView
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  const publicPages = ['TheLoginView']
  const authRequired = !publicPages.includes(to.name ?? '')

  if (authRequired && !authStore.isAuthenticated) {
    next({ name: 'TheLoginView' })
  } else {
    next()
  }
})

export default router
