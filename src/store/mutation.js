import * as types from './mutation-types';

const mutations = {
  [types.LOGIN] (state, data) {
    switch (state.authType) {
      case 'SESSION':
        state.user = data.user;
        localStorage.setItem('user', data.user);
        break;
      case 'JWT':
        localStorage.setItem('token', data.token);
        state.token = data;
        localStorage.setItem('username', data.name);
        state.username = data.name;
        break;
    }
  },
  [types.LOGOUT] (state) {
    switch (state.authType) {
      case 'SESSION':
        state.user = '';
        localStorage.removeItem('user');
        break;
      case 'JWT':
        localStorage.removeItem('token');
        state.token = null;
        localStorage.setItem('username');
        state.username = null;
        break;
    }
  },
  [types.DELSESSION] (state) {
    localStorage.removeItem('session');
  },
  [types.SET_AUTH_TYPE] (state, data) {
    state.authType = data.type;
  },
};

export default mutations;
