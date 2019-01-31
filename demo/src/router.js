import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login/Login.vue')
    },
    {
      path: '/',
      name: 'index',
      component: () => import('./views/Index/Index.vue'),
      children:[
        {
          path: '/',
        name: 'home',
      component: () => import('./views/Home/Home.vue'),
        },
        {
          path: '/addAccount',
        name: 'addAccount',
      component: () => import('./views/addAccount/addAccount.vue'),
        },
        {
          path: '/commodityManagement',
        name: 'commodityManagement',
      component: () => import('./views/commodityManagement/commodityManagement.vue'),
        },
        {
          path: '/iTunes',
        name: 'iTunes',
      component: () => import('./views/iTunes/iTunes.vue'),
        },
        {
          path: '/ModifyAccount',
        name: 'ModifyAccount',
      component: () => import('./views/ModifyAccount/ModifyAccount.vue'),
        },
        {
          path: 'addMerchandise',
        name: 'addMerchandise',
      component: () => import('./views/addMerchandise/addMerchandise.vue'),
        },
        {
          path: 'DBS',
        name: 'DBS',
      component: () => import("./views/DBS/DBS.vue"),
        },
        {
          path: 'SalesStatistics',
        name: 'SalesStatistics',
      component: () => import('./views/SalesStatistics/SalesStatistics.vue'),
        },
      ]
    }
  ]  
})
