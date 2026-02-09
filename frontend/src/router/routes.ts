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
        component: () => import('src/pages/LogIn.vue'),
      },
      { 
        path: 'profile', 
        component: () => import('src/pages/UserProfile.vue'),
        meta: {requiresAuth: true},
      },
      { 
        path: 'settings', 
        component: () => import('src/pages/UserPreferences.vue'),
        meta: {requiresAuth: true},
      },
      { 
        path: 'contact', 
        component: () => import('src/pages/ContactUs.vue') 
      },
    ]
  },
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { 
        path: 'check_dashboard', 
        component: () => import('pages/admin/DashboardLayout.vue') ,
      },
      { 
        path: 'manage_inventory', 
        component: () => import('pages/admin/InventoryManagement.vue'),
      },
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
