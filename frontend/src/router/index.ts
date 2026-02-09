import { defineRouter } from '#q-app/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import routes from './routes';
import { useAuthStore } from 'src/stores/auth-store';

// 1. Tell TypeScript about your meta fields
declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean;
    role?: 'admin' | 'user';
  }
}

export default defineRouter(function ({ store }) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  // 2. The Navigation Guard
  Router.beforeEach((to, from, next) => {
    const authStore = useAuthStore(store); 
    const isLoggedIn = !!authStore.token;
    const userRole = authStore.user?.role;

    // Check if any part of the path (parent or child) requires auth
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const requiredRole = to.meta.role;

    if (requiresAuth && !isLoggedIn) {
      // User is not logged in, redirect to login
      next({ path: '/login' });
    } else if (requiredRole === 'admin' && userRole !== 'admin') {
      // User is logged in but not an admin
      next({ path: '/' }); 
    } else {
      // Everything is fine, proceed
      next();
    }
  });

  return Router;
});