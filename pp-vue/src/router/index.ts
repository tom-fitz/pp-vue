import { createRouter, createWebHistory } from 'vue-router'
import { getAuth } from 'firebase/auth'
import { getCurrentUser, fbAuth } from '../plugins/firebase'

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
      component: () => import('../modules/user/UserLogin.vue'),
      meta: {
        title: 'Login',
        isAuth: false,
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../modules/user/UserRegister.vue'),
      meta: {
        title: 'Register',
        isAuth: false,
      }
    },
    {
      path: '/program/dashboard',
      name: 'program-dashboard',
      component: () => import('../modules/program/ProgramDashboard.vue'),
      meta: {
        title: 'Program Dashboard',
        isAuth: true,
      }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  if (to.meta?.isAuth == true) {
    const user = await getCurrentUser()
    if (!user) {
      next('/login')
    }
  }
  next();
})

export default router
