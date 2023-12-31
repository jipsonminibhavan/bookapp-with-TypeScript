import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/AuthStore'
const HomeView = () => import('@/views/HomeView.vue')
import AboutView from '@/views/AboutView.vue'
const BookDetailView = () => import('@/views/BookDetailView.vue')
const BookListView = () => import('@/views/BookListView.vue')
const BookEditView = () => import('@/views/BookEditView.vue')
const BookNewView = () => import('@/views/BookNewView.vue')
const TheLoginView = () => import('@/views/TheLoginView.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/books',
    name: 'Books',
    component: BookListView,
    meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: { requiresAuth: true }
  },

  {
    path: '/books/:isbn',
    name: 'BookDetailView',
    component: BookDetailView,
    meta: { requiresAuth: true }
  },
  {
    path: '/books/:isbn/edit',
    name: 'BookEditView',
    component: BookEditView,
    meta: { requiresAuth: true }
  },
  {
    path: '/books/create',
    name: 'BookNewView',
    component: BookNewView,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'TheLoginView',
    component: TheLoginView,
    meta: { requiresAuth: false }
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  // alert('foobar')
  console.log('start')
  const authStore = useAuthStore()
  if (to.name !== 'TheLoginView' && !authStore.isAuthenticated) {
    console.log('authenticated')
    next({ name: 'TheLoginView' })
  } else {
    next()
  }
})
export default router
