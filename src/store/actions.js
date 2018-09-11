import * as types from './mutation-types';

const actions = {
  userLogin ({commit}, data) {
    commit(types.LOGIN, data);
  },
  userLoginOut ({commit}) {
    commit(types.LOGINOUT);
  },
  setAuthType ({commit}, data) {
    commit(types.SET_AUTH_TYPE, data);
  }
};

export default actions;
