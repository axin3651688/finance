import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes: [{
      path: '/',
      redirect: '/message',
    },
    {
      path: '/',
      name: '我的工作台',
      component: () =>
        import('@v/layout/BorderPage'),
      children: [{
          path: '/jsnk/module',
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

        // 列表
        {
          path: '/list',
          name: 'list',
          component: () =>
            import('@v/intelligenceReport/List.vue')
        },
        // 报告查看
        {
          path: '/Report_view',
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
    }, {
      path: '/',
      name: '我的工作台',
      component: () =>
        import('@v/layout/TjspPage'),
      children: [{
          path: '/tjsp/module',
          name: 'module',
          component: () =>
            import('@v/BiModule'),
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
          path: '/Report_view',
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
          path: '/BiFunnel',
          name: 'BiFunnel',
          component: () =>
            import('@c/charts/BiFunnel'),
        }, {
          path: '/BiRadar',
          name: 'BiRadar',
          component: () =>
            import('@c/charts/BiRadar'),
        },
        {
          path: '/BiPie',
          name: 'BiPie',
          component: () =>
            import('@c/charts/BiPie'),
        }, {
          path: '/BiTreemap',
          name: 'BiTreemap',
          component: () =>
            import('@c/charts/BiTreemap'),
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