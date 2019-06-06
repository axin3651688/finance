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
        },
        // 角色
        {
          path: '/cube',
          name: 'cube',
          component: () =>
            import('@v/test/Cube.vue')
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
          path: '/Btransition',
          name: 'Btransition',
          component: () =>
            import('@v/test/Btransition'),
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
  }else{
    localStorage.database = {"user":{"id":1,"birthday":null,"avatar":"http://223.255.22.11:6680/group2/M00/00/11/wKgC2lyLBDSAd_H0AAM3tFJUw6M100.jpg","email":"344017861@qq.com","phone":"18855108400","sign":"岂能尽如人意，但求无愧我心。","trueName":"经邦机器人","username":"adminroot","sex":54,"workState":59,"enable":1},"dept":{"id":48,"note":"测试","code":"3724","pid":"1","text":"雨测试部","leaf":0,"level":1,"ownerId":289,"companyId":1,"ownerName":null,"userCount":null,"userContainChild":null,"childDeptCount":null},"role":{"id":48,"text":"体验用户","companyId":53,"admin":0,"note":"体验用户"},"company":{"id":53,"text":"江苏农垦","avatar":"http://jiaxin365.cn/images/jsnk.svg","note":"农垦项目演示","enable":1,"licenseId":7,"createUser":397,"rangeId":19,"industryId":1446,"typeId":null,"regionId":530101,"rangeText":null,"industryText":null,"regionText":null,"typeText":null,"customerId":"1","url":"http://223.255.22.11:6680/jsnk/","code":"1010","pid":"26","leaf":0,"primaryId":null,"level":1,"authCompanyIds":null,"children":null},"license":{"id":7,"text":"集团用户","maxlevel":5,"single":20,"userCount":20},"authorization":"YWRtaW5yb290JTdFMSU0MDE1NTgwNTA0OTQxNTRNb3ppbGxhNTBXaW5kb3dzTlQ2MVdPVzY0QXBwbGVXZWJLaXQ1MzczNktIVE1MbGlrZUdlY2tvQ2hyb21lNjkwMzQ5NzEwMFNhZmFyaTUzNzM2JTQwMTI5MDglN0UxJTdFNjAwMDAw","deviceVo":{"brand":"pc","device":"1558050494154Mozilla50WindowsNT61WOW64AppleWebKit53736KHTMLlikeGeckoChrome6903497100Safari53736","platform":"windows"}}
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