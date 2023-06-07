import { createRouter, createWebHistory } from 'vue-router'
import { getAuth } from 'firebase/auth'
import { getCurrentUser, fbAuth } from '../plugins/firebase'
import { useUserStore } from '@/modules/user/store'

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
        isAuth: false,
        isAdmin: false,
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../modules/user/UserRegister.vue'),
      meta: {
        isAuth: false,
        isAdmin: false,
      }
    },
    {
      path: '/program/dashboard',
      name: 'program-dashboard',
      component: () => import('../modules/program/ProgramDashboard.vue'),
      meta: {
        isAuth: true,
        isAdmin: true,
      }
    },
    {
      path: '/program',
      name: 'program-list',
      component: () => import('../modules/program/ProgramList.vue'),
      meta: {
        isAuth: true,
        isAdmin: false,
      }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  if (to.meta?.isAuth == true) {
    const user = await getCurrentUser()
    console.log("user: ", user)
    // if (!user) {
    //   console.log("user not logged in: ", user)
    // }
  }
  next();
})

export default router
