import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import TrainerView from '@/views/TrainerView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/trainer/:trainer',
      name: 'tainer',
      component: TrainerView,
      props: true
    }
  ]
});

export default router;
