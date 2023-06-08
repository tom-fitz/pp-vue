import { createRouter, createWebHistory } from 'vue-router'
import { type User as fbUser } from 'firebase/auth'
import { getCurrentUser } from '../plugins/firebase'
import { useUserStore } from '@/modules/user/store'
import { User } from '../modules/user/User'

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
    // these will likely need to be refactored as the separation between admin and authenticated user become more clear.
    // will need to create parent route /admin
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

router.beforeEach(async (to, from) => {
  const store = useUserStore();
  if (to.meta?.isAuth == true) {
    const currentUser = await getCurrentUser();
    const newUser = new User();

    newUser.set(currentUser as fbUser); 
    store.setCurrentUser(newUser);

    // TODO: this auth data should really live in the token returned from FB
    // this will suffice for now, but really should be done in a FB function
    // as a user is being registered/logged in. Put the data on the token and
    // then parse it out here.

    // redirect to login screen if user is not already logged in and the route requires auth.
    if (!currentUser && to.meta.isAuth && to.name !== 'login') return { name: 'login' };
    // check if user is not an admin but trying to access an admin route. Cancel the route and set an error message.
    if (to.meta.isAdmin && !newUser.isAdmin) {
      await store.setErrorMessage(`User ${newUser.email} does not have permission to access ${to.name?.toString()}. Contact admin.`);
      return false;
    }
  }
})

export default router
