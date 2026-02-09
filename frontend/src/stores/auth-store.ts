import { defineStore } from 'pinia';

// 1. Define the shape of your User data from PostgreSQL
export interface User {
  id: number;
  email: string;
  role: 'admin' | 'user'; // String literal types are great for modes
  name?: string;          // Optional field
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    // 2. Tell the state this is a User object or null
    user: null as User | null,
    token: localStorage.getItem('token') || '',
  }),
  
  actions: {
    // 3. Replace 'any' with the 'User' interface
    login(userData: User, token: string) {
      this.user = userData;
      this.token = token;
      localStorage.setItem('token', token);
    },
    
    logout() {
      this.user = null;
      this.token = '';
      localStorage.removeItem('token');
    }
  },
});