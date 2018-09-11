import * as types from './mutation-types';

const actions = {
  userLogin ({commit}, data) {
    commit(types.LOGIN, data);
  },
  userLogOut ({commit}) {
    commit(types.LOGOUT);
  },
  setAuthType ({commit}, data) {
    commit(types.SET_AUTH_TYPE, data);
  }
};

export default actions;
