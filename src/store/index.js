import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutation';

Vue.use(Vuex);

const state = {
  user: {
    name: ''
  },

  token: null,
  username: '',

  authType: 'SESSION'
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
});
