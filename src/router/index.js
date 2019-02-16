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
      name: '我的工作台',
      component: () =>
        import('@v/layout/BorderPage'),
      children: [{
          path: '/main',
          name: 'main',
          component: () =>
            import('@v/BiModule'),
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


        {
          path: '/Column',
          name: 'Column',
          component: () =>
            import('@v/test/BiColumn.vue')
        },

        {
          path: '/Fill',
          name: 'Fill',
          component: () =>
            import('@v/test/Fill.vue')
        }, {
          path: '/TableTest',
          name: 'TableTest',
          component: () =>
            import('@v/test/TableTest.vue')
        }, {
          path: '/fu',
          name: 'fu',
          component: () =>
            import('@v/test/fu.vue')
        }, {
          path: '/tab',
          name: 'tab',
          component: () =>
            import('@v/test/tab.vue')
        }, {
          path: '/Jtreegrid',
          name: 'Jtreegrid',
          component: () =>
            import('@v/test/asycTree/Jtreegrid.vue')
        }, {
          path: '/test',
          name: 'test',
          component: () =>
            import('@v/test/test.vue')
        }

      ]
    },
    {
      path: '/Login',
      name: 'Login',
      component: () =>
        import('@v/layout/login/Login'),
    },
    {
      path: '*',
      name: '/404',
      component: () =>
        import('@v/common/404'),
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
// beforeRouteLeave(to, from, next) {
//   const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
//   if (answer) {
//     next()
//   } else {
//     next(false)
//   }
// }
export default router;