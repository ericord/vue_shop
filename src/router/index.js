import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: Users },
    ],
  },
]

const router = new VueRouter({
  routes,
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  var tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  return next()
})
export default router
