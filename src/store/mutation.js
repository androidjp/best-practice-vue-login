import * as types from './mutation-types';

const mutations = {
  [types.LOGIN] (state, data) {
    switch (state.authType) {
      case 'SESSION':
        break;
      case 'JWT':
        localStorage.setItem('token', data.token);
        state.token = data;
        break;
    }
    localStorage.setItem('user', data.user);
    state.user = data.user;
  },
  [types.LOGOUT] (state) {
    switch (state.authType) {
      case 'SESSION':
        break;
      case 'JWT':
        localStorage.removeItem('token');
        break;
    }
    state.user = '';
    localStorage.removeItem('user');
  },
  [types.DELSESSION] (state) {
    localStorage.removeItem('session');
  },
  [types.SET_AUTH_TYPE] (state, data) {
    state.authType = data.type;
  },
};

export default mutations;
