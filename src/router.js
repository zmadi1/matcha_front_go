import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Auth from './views/Auth.vue'
import Profile from './views/Profile.vue'
import EditProfile from './views/EditProfile.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/auth',
      name: 'authentication',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Auth
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/editprofile',
      name: 'editprofile',
      component: EditProfile
    }
  ]
})
