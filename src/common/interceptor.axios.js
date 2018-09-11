import axios from 'axios';
import router from '@/router';
import store from '../store';

axios.default.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/json';

// axios intercept request
// axios.interceptors.request.use(config => {
//     if (store.state.authType === 'JWT') {
//       // judge if localStorage exist token, then should add the token on every http request header
//       if (localStorage.getItem('token')) {
//         config.headers.Authorization = `token ${localStorage.getItem('token')}`.replace(/(^")|("$)/g, '');
//       } else {
//         router.replace({
//           path: 'login',
//           query: {
//             redirect: router.currentRoute.fullPath,
//           },
//         });
//       }
//     }
//   }, error => {
//     return Promise.reject(error);
//   },
// );

function getPassportByAuthType (response) {
  let passport = null;
  if (response) {
    if (store.state.authType === 'SESSION') {
      passport = response.data.session;
    } else if (store.state.authType === 'JWT') {
      passport = response.data.token;
    }
  }
  return passport;
}

//axios intercept response
axios.interceptors.response.use(response => {
    //  backend checkLogin response data  as the redirect data.
    let passport = getPassportByAuthType(response);
    if (!passport) {
      router.replace({
        path: 'login',
        query: {
          redirect: router.currentRoute.fullPath,
        },
      });
    }
    return response;
  }, error => {
    return Promise.reject(error);
  },
);

export default axios;
