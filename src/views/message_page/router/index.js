import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';

Vue.use(Router);

const router = new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/message_page/home'
    },
    {
      path: '*',
      name: '/404',
      component: () =>
        import('@v/common/404')
    },

    {
      path: '/message_page',
      redirect: '/message_page/home'
    },
    {
      path: '/message_page',
      name: 'MessagePage',
      component: () => import('@v/message_page/MessagePage.vue'),
      children: [
        {
          path: '/message_page/home', // 消息-首页
          name: 'Home',
          meta: {
            title: '首页'
          },
          component: () => import('@mp/home/Home.vue')
        },
        {
          path: '/message_page/contact', // 消息-通讯录
          name: 'Contact',
          meta: {
            title: '通讯录'
          },
          component: () => import('@mp/contact/Contact.vue')
        },
        {
          path: '/message_page/msg', // 消息-聊天页面
          name: 'Msg',
          meta: {
            title: '消息'
          },
          component: () => import('@mp/msg/Msg.vue')
        }
      ]
    },
    {
      path: '/message_login', // 消息-登陆
      name: 'Login',
      meta: {
        title: '登陆'
      },
      component: () => import('@mp/login/Login.vue')
    }
  ]
});

/**
 * 路由守卫
 * 如果有验证信息，就直接跳首页，否则跳登陆页
 */
router.beforeEach((to, from, next) => {
  // let IS_LOGIN = localStorage.authorization ? true : false
  let IS_LOGIN = !!localStorage.authorization;
  if (IS_LOGIN) {
    to.path === '/message_login' ? next('/message_page/home') : next();
  } else {
    to.path === '/message_login' ? next() : next('/message_login');
  }
  store.dispatch('ActionSetMessageStore', {routeName: to.meta.title});
});

export default router;
