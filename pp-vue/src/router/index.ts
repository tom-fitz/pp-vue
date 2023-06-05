import { createRouter, createWebHistory } from 'vue-router'
import { getAuth } from 'firebase/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../modules/user/UserLogin.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../modules/user/UserRegister.vue'),
    },
    {
      path: '/program/dashboard',
      name: 'program-dashboard',
      component: () => import('../modules/program/ProgramDashboard.vue'),
      meta: {
        private: true
      }
    }
  ]
})

router.beforeEach(to => {
  if (to.meta.private && !getAuth().currentUser?.getIdToken(true)) {
    router.push('/login')
  }
})

export default router
