// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import axiosWithInterceptor from './common/interceptor.axios';

Vue.use(iView);

Vue.config.productionTip = false;

// api
import rest from './rest';
import store from './store';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  rest,
  store,
  components: {App},
  template: '<App/>',
});
