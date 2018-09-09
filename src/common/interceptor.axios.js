import axios from 'axios';
import router from '@/router';

axios.default.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/json';

// axios intercept request
axios.interceptors.request.use(config => {
    // judge if localStorage exist token, then should add the token on every http request header
    if (localStorage.getItem('token')) {
      config.headers.Authorization = `token ${localStorage.getItem('token')}`.replace(/(^")|("$)/g, '');
    } else {
      router.replace({
        path: 'login',
        query: {
          redirect: router.currentRoute.fullPath,
        },
      });
    }
  }, error => {
    return Promise.reject(error);
  },
);

//axios intercept response
axios.interceptors.response.use(response => {
    //  backend checkLogin response data  as the redirect data.
    if (!response.data.token) {
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
