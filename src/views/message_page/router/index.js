import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const router = new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes: [{
    path: '/',
    redirect: '/message_page/home',
  },
    {
      path: '*',
      name: '/404',
      component: () =>
        import('@v/common/404'),
    },
    {
      path: '/message_page',
      redirect: '/message_page/home',
    },
    {
      path: '/message_page',
      name: 'MessagePage',
      component: () => import('@v/message_page/MessagePage.vue'),
      children: [{
        path: '/message_page/home', // 消息-通讯录
        name: 'Home',
        component: () => import('@v/message_page/home/Home.vue'),
      }, {
        path: '/message_page/contact', // 消息-通讯录
        name: 'Contact',
        component: () => import('@v/message_page/contact/Contact.vue'),
      },
        {
          path: '/message_page/msg', // 消息-聊天页面
          name: 'Msg',
          component: () => import('@v/message_page/msg/Msg.vue'),
        }
      ]
    },
    {
      path: '/message_login', // 消息-聊天页面
      name: 'Login',
      component: () => import('@v/message_page/login/Login.vue'),
    }
  ]
});

// 路由守卫

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.authorization ? true : false;
  if (to.path === "/message_login") {
    next();
  } else {
    isLogin ? next() : next("/message_login");
  }
});

export default router;
