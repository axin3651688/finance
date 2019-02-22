import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import {
  getClientParams
} from "utils/index";
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
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
          path: '/main',
          name: 'main',
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

        // 消息模块
        {
          path: '/message',
          name: 'message',
          component: () =>
            import('@v/message/Message.vue')
        },
        // 公司
        {
          path: '/company',
          name: 'company',
          component: () =>
            import('@v/test/Company.vue')
        },
        // 用户
        {
          path: '/user',
          name: 'user',
          component: () =>
            import('@v/test/User.vue')
        },
        // 角色
        {
          path: '/role',
          name: 'role',
          component: () =>
            import('@v/test/Role.vue')
        }

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
        }, 
        // {// sjz 专用测试
        //   path: '/testDebug',
        //   name: 'testDebug',
        //   component: () =>
        //     import('@v/test/testDebug'),
        // },
        // {// sjz 专用测试
        //   path: '/treeTable',
        //   name: 'treeTable',
        //   component: () =>
        //     import('@c/treeTable/treeGrid'),
        // },
        // {// sjz 专用测试(用户管理)
        //   path: '/com',
        //   name: 'com',
        //   component: () =>
        //     import('@c/treeTable/com'),
        // },
        {// sjz 专用测试(日志管理)
          path: '/log',
          name: 'log',
          component: () =>
            import('@v/systemSettings/log')
        },
        {// sjz 专用测试(在线用户)
          path: '/online',
          name: 'online',
          component: () =>
            import('@v/systemSettings/online')
        },
        // {//市管企业经营业绩情况表
        //   path: '/sgyj',
        //   name: 'sgyj',
        //   component: () =>
        //     import('@v/systemSettings/shiguan')
        // },
        // {//EVA表
        //   path: '/eva',
        //   name: 'eva',
        //   component: () =>
        //     import('@v/systemSettings/EVA')
        // },
        // 利润表
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


        // 填报表格
        {
          path: '/table',
          name: 'table',
          component: () =>
            import('@v/intelligenceReport/Itable.vue')
        },
        {
          path: '/a',
          name: 'a',
          component: () =>
            import('@v/intelligenceReport/a.vue')
        },
        {
          path: '/handsontable',
          name: 't',
          component: () =>
            import('@v/intelligenceReport/Handtable.vue')
        },
        {
          path: '/i',
          name: 'i',
          component: () =>
            import('@c/Itable')
        },
        {
          path: '/Fill',
          name: 'Fill',
          component: () =>
            import('@v/test/Fill.vue')
        },

      ]
    },
    {
      path: '/Login',
      name: 'Login',
      component: () =>
        // import('@v/layout/login/Login'),
        // import('@v/layout/login/LoginNew'),
        import('@v/layout/login/LoginNew'),
    },
    {
      path: '*',
      name: '/404',
      component: () =>
        import('@v/common/404')
    },

  ]
})

// 路由守卫

router.beforeEach((to, from, next) => {
  let bean = getClientParams();
  let authorization = bean.authorization || bean.tikct || bean.token;
  if (!authorization) {
    authorization = localStorage.authorization ? true : false;
  }
  // debugger;
  if (to.path == "/login") {
    next();
  } else {
    authorization ? next() : next("/login");
  }
})

export default router;