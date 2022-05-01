import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetailView from '../views/DetailView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: "Home"
    }
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: DetailView,
    props: true,
    meta: {
      title: "Detail"
    }
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
