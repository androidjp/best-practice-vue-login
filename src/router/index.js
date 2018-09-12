import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Login from '@/components/Login';
// import store from '../store';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {
        requireLogin: true, // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        requireNotLogin: true, // 添加该字段，表示进入这个路由是需要登录的
      },
    },
  ],
});

// router.beforeEach((to, from, next) => {
//
//   switch (store.state.authType) {
//     case 'SESSION':
//       let user = localStorage.getItem('user');
//       if (to.meta.requireNotLogin && user) {
//         next({path: '/'});
//       }
//       next();
//       break;
//
//     case 'JWT':
//       let token = localStorage.getItem('token');
//       if (to.meta.requireAuth) {
//         // if meet the criteria : exist meta.requireAuth
//         if (token) {
//           next();
//         } else {
//           next({
//             path: '/login',
//             query: {
//               redirect: to.fullPath,
//             },
//           });
//         }
//       } else {
//         next();
//       }
//       break;
//   }
// });


export default router;
