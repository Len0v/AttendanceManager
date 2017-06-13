/**
 * Created by kada on 6/9/2017.
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    snackbar: false,
    context: null,
    text: ''
  },
  mutations: {
    displaySnackbar(state, snackbar) {
      state.snackbar = true;
      state.context = snackbar.context;
      console.log('zxzx');
      console.log(snackbar.text);
      state.text = snackbar.text;
    },
    hideSnackbar(state) {
      state.snackbar = false;
    }
  }
});

