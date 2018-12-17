import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes: [{
      path: '/',
      redirect: '/module',
    },
    {
      path: '/',
      name: '我的工作台',
      component: () =>
        import('@v/layout/BorderPage'),
      children: [{
          path: '/module',
          name: 'module',
          component: () =>
            import('@v/BiModule'),
        },
        // 风险分析
        {
          path: '/Risk',
          name: 'Risk',
          component: () =>
            import('@v/intelligenceReport/Risk_analysis.vue')
        },
        {
          path: '/profit',
          name: 'profit',
          component: () =>
            import('@v/intelligenceReport/Profit.vue')
        },
        // 列表
        {
          path: '/list',
          name: 'list',
          component: () =>
            import('@v/intelligenceReport/List.vue')
        },
        // 报告查看
        {
          path: '/module/Report_view',
          name: 'Report_view',
          component: () =>
            import('@v/intelligenceReport/Report_view.vue')
        },
        {
          path: '/message',
          name: 'message',
          component: () =>
            import('@v/message/Message.vue')
        },


      ]
    },
    {
      path: '/',
      name: '各种charts',
      component: () =>
        import('@v/layout/BorderPage'),
      children: [{
          path: '/BiBar',
          name: 'BiBar',
          component: () =>
            import('@c/charts/BiBar'),
        }, {
          path: '/BiFunnel',
          name: 'BiFunnel',
          component: () =>
            import('@c/charts/BiFunnel'),
        }, {
          path: '/BiMSCloumnLine',
          name: 'BiMSCloumnLine',
          component: () =>
            import('@c/charts/BiMSCloumnLine'),
        }, {
          path: '/BiRadar',
          name: 'BiRadar',
          component: () =>
            import('@c/charts/BiRadar'),
        }, {
          path: '/BiArea',
          name: 'BiArea',
          component: () =>
            import('@c/charts/BiArea'),
        }, {
          path: '/BiRosepie',
          name: 'BiRosepie',
          component: () =>
            import('@c/charts/BiRosepie'),
        },
        {
          path: '/BiPie',
          name: 'BiPie',
          component: () =>
            import('@c/charts/BiPie'),
        },
        {
          path: '/BiPieLuntai',
          name: 'BiPieLuntai',
          component: () =>
            import('@c/charts/BiPieLuntai'),
        }, {
          path: '/Tree',
          name: 'Tree',
          component: () =>
            import('@c/charts/DemoTree'),
        }
      ]
    },
    {
      path: '/',
      name: 'test路由',
      component: () =>
        import('@v/layout/BorderPage'),
      children: [{
          path: '/treeTest',
          name: 'treeTest',
          component: () =>
            import('@v/test/treeTest'),
        }, {
          path: '/BiTreemap',
          name: 'BiTreemap',
          component: () =>
            import('@c/charts/BiTreemap')

        },
        {
          path: '/father',
          name: 'father',
          component: () =>
            import('@v/test/father'),
        },
        {
          path: '/testChart',
          name: 'testChart',
          component: () =>
            import('@v/test/testChart'),
        }, {
          path: '/genarateTree',
          name: 'genarateTree',
          component: () =>
            import('@v/test/genarateTree'),
        },

        {
          path: '/productIntroduction',
          name: 'productIntroduction',
          component: () =>
            import('@v/test/eleTreeTable'),
        }, // 利润表
        {
          path: '/profit',
          name: 'profit',
          component: () =>
            import('@v/intelligenceReport/Profit.vue')
        },
        // 报告查看
        {
          path: '/Report_view',
          name: 'Report_view',
          component: () =>
            import('@v/intelligenceReport/Report_view.vue')
        },

        {
          path: '/Column',
          name: 'Column',
          component: () =>
            import('@v/test/BiColumn.vue')
        },
        // {
        //   path: '/t',
        //   name: 't',
        //   component: () =>
        //     import('@v/intelligenceReport/t.vue')
        // },

        // 填报表格
        {
          path: '/table',
          name: 'table',
          component: () =>
            import('@v/intelligenceReport/Itable.vue')
        },
        // 展现
        // {
        //   path: '/show',
        //   name: 'show',
        //   component: () =>
        //     import('@v/intelligenceReport/show.vue')
        // },
        {
          path: '/Fill',
          name: 'Fill',
          component: () =>
            import('@v/test/Fill.vue')
        },
        {
          path: '/company',
          name: 'company',
          component: () =>
            import('@v/test/Company.vue')
        }, {
          path: '/user',
          name: 'user',
          component: () =>
            import('@v/test/User.vue')
        }, {
          path: '/role',
          name: 'role',
          component: () =>
            import('@v/test/Role.vue')
        }
      ]
    },
    {
      path: '/Login',
      name: 'Login',
      component: () =>
        import('@v/layout/Login'),
    },
    {
      path: '*',
      name: '/404',
      component: () =>
        import('@v/common/404'),
    }
  ]
})

// 路由守卫

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.authorization ? true : false;
  if (to.path == "/login" || to.path == "/register") {
    next();
  } else {
    isLogin ? next() : next("/login");
  }
})

export default router;