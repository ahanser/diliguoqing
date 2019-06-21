import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
// 基础继承组件
import Layout from '../views/layout/Layout'
import baseLayout from '../views/layout/baseLayout.vue'
export const constantRouterMap = [{
    path: '/login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/404',
    component: () => import('@/views/404')
  },
  {
    path: '/',
    component: baseLayout,
    redirect: '/ecolo',
    children: [{
        path: '1',
        component: () => import('@/views/distribution/index')
        },{
          path: '2',
          component: () => import('@/views/qulity/index.vue')
        },{
          path: 'try',
          name: "Try",
          component: () => import('@/views/try')
      },{
          path: 'ecolo',
          name: "Ecolo",
          component: () => import('@/views/ecolo')
        },{
          path: 'human',
          name: "Human",
          component: () => import('@/views/human')
        },{
          path: 'elocoVal',
          name: "ElocoVal",
          component: () => import('@/views/elocoVal')
      }
    ]
  },
  {
    path: '/example1',
    component: Layout,
    redirect: '/example1/role',
    children: [

      {
        path: 'user',
        component: () => import('@/views/user/index')
      },
      {
        path: 'role',
        component: () => import('@/views/role/index')
      },
      {
        path: 'menu',
        component: () => import('@/views/menu/index')
      },
      {
        path: 'order',
        component: () => import('@/views/order/index')
      },
      {
        path: 'dept',
        component: () => import('@/views/dept/index')
      },

    ]
  },


  {
    path: '*',
    redirect: '/404'
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
