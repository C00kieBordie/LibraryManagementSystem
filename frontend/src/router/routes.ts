import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { 
        path: '', 
        component: () => import('pages/IndexPage.vue') 
      },
      { 
        path: 'login', 
        component: () => import('src/pages/LogIn.vue') 
      },
      { 
        path: 'profile', 
        component: () => import('src/pages/UserProfile.vue') 
      },
      { 
        path: 'settings', 
        component: () => import('src/pages/UserPreferences.vue') 
      },
      { 
        path: 'contact', 
        component: () => import('src/pages/ContactUs.vue') 
      },

    ]
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
