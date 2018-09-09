import * as types from './mutation-types';

const mutations = {
  [types.LOGIN] (state, data) {
    localStorage.setItem('token', data.token);
    state.token = data;
    localStorage.setItem('username', data.name);
    state.username = data.name;
  },
  [types.LOGINOUT] (state) {
    localStorage.removeItem('token');
    state.token = null;
    localStorage.setItem('username');
    state.username = null;
  },
};

export default mutations;