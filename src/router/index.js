import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Admin from '../views/Admin.vue'
import User from '../views/User.vue'
import Home from '../views/Home.vue'

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/admin', component: Admin, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/user', component: User, meta: { requiresAuth: true } },
  { path: '/home', component: Home }, // Removí requiresAuth: true
  { path: '/guest', component: Home, meta: { isGuest: true } },
]

const router = createRouter({
  history: createWebHistory('#'),
  routes
})

//proteccion de rutas
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('authToken');
  const user = JSON.parse(sessionStorage.getItem('authUser'));

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token || !user) {
      next({ path: '/game' });
    } else if (to.matched.some(record => record.meta.requiresAdmin) && user.rol !== 'ADMIN') {
      next('/game');
    } else {
      next();
    } 
  } else if (to.matched.some(record => record.meta.isGuest)) {
    if (token && user) {
      next('/game');
    } else {
      next();
    }
  } else {
    if ((to.path === '/login' || to.path === '/register') && token) {
      next('/game');
    } else {
      next();
    }
  }
});

export default router;