import Vue from 'vue'
import Router from 'vue-router'
import IndexRedirect from '@/views/IndexRedirect'
import DefaultNotFound from '@/views/DefaultNotFound'

import Login from '@/views/Login'
import Logout from '@/views/Logout'

import Index from '@/views/Index'
import About from '@/views/About'
import Introduction from '@/views/Introduction'

import CustomerManager from '@/views/CustomerManager'
import CustomerVisit from '@/views/CustomerVisit'
import Settings from '@/views/Settings'

import BackPages from '@/BackPages'
import FrontPages from '@/FrontPages'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'FrontPages',
      component: FrontPages,
      children: [
        {
          path: '',
          name: 'IndexRedirect',
          component: IndexRedirect,
          meta: { title: '正在跳转', noLoading: true }
        },
        {
          path: 'login',
          name: 'Login',
          component: Login,
          meta: { title: '登录', noLoading: true }
        },
        {
          path: 'logout',
          name: 'Logout',
          component: Logout,
          meta: { title: '登出', noLoading: true }
        },
        {
          path: 'about',
          name: 'About',
          component: About,
          meta: { title: '关于项目' }
        },
        {
          path: 'introduction',
          name: 'Introduction',
          component: Introduction,
          meta: { title: '项目介绍' }
        },
      ]
    },
    {
      path: '/admin/',
      name: 'BackPages',
      component: BackPages,
      children: [
        {
          path: '',
          name: 'Index',
          component: Index,
          meta: { title: '后台首页' }
        },
        {
          path: 'crm',
          name: 'CustomerManager',
          component: CustomerManager,
          meta: { title: '客户管理' }
        },
        {
          path: 'visitor',
          name: 'CustomerVisit',
          component: CustomerVisit,
          meta: { title: '客户访问' }
        },
        {
          path: 'setting',
          name: 'Settings',
          component: Settings,
          meta: { title: '系统设置' }
        },
      ]
    },

    {
      path: '*',
      name: 'DefaultNotFound',
      component: DefaultNotFound,
      meta: { title: '404' }
    },
  ]
})
