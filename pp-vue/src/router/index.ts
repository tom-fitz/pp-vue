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
      path: '/program/create',
      name: 'program-create',
      component: () => import('../modules/program/CreateEdit/CreateNameDesc.vue'),
      meta: {
        isAuth: true,
        isAdmin: true,
      },
    },
    {
      path: '/program/:id/create/workouts',
      name: 'program-create-workouts',
      component: () => import('../modules/program/CreateEdit/CreateWorkouts.vue'),
      meta: {
        isAuth: true,
        isAdmin: true,
      }
    },
    {
      path: '/program/:uid',
      name: 'program-list',
      component: () => import('../modules/program/ProgramList.vue'),
      meta: {
        isAuth: true,
        isAdmin: false,
      }
    },
    {
      path: '/program/:uid/:id',
      name: 'program-view',
      component: () => import('../modules/program/ProgramView.vue'),
      meta: {
        isAuth: true,
        isAdmin: false,
      }
    },
    {
      path: '/admin/user/:uid/profile',
      name: 'user-admin-view',
      component: () => import('@/modules/user/UserAdminView.vue'),
      meta: {
        isAuth: true,
        isAdmin: true,
      }
    },
    {
      path: '/user/:uid/profile',
      name: 'user-profile',
      component: () => import('@/modules/user/UserProfile.vue'),
      meta: {
        isAuth: true,
        isAdmin: false,
      }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const store = useUserStore();
  const currentFBUser = await getCurrentUser();
  const newUser = new User();
  newUser.set(currentFBUser as fbUser);
  await store.setCurrentUser(newUser.id);
  if (to.meta?.isAuth == true) {
    if (to.meta.isAuth && !currentFBUser) {
      next('/login')
      return
    }

    // TODO: this auth data should really live in the token returned from FB
    // this will suffice for now, but really should be done in a FB function
    // as a user is being registered/logged in. Put the data on the token and
    // then parse it out here.

    
    // check if user is not an admin but trying to access an admin route. Cancel the route and set an error message.
    if (to.meta.isAdmin && !newUser.isAdmin) {
      await store.setErrorMessage(`User ${newUser.email} does not have permission to access ${to.name?.toString()}. Contact admin.`);
      next(from)
      return;
    }
  }
  next()
})

export default router
