import { createRouter, createWebHistory } from 'vue-router'


import Home from '@/components/Home'
import Profile from '@/components/Profile'
import Accounts from '@/components/Accounts'
import Recipients from '@/components/Recipients'

const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/accounts',
      name: 'Accounts',
      component: Accounts
    },
    {
      path: '/recipients',
      name: 'Recipients',
      component: Recipients
    },    
  ];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
