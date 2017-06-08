import './index.scss';
import '../node_modules/vuetify/dist/vuetify.min.css';

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Vuetify from 'vuetify';
import routesConfig from './app/config/routes';
import Navbar from './app/components/header/header.vue';

Vue.use(Vuetify);
Vue.use(VueRouter);
Vue.use(VueResource);

Vue.http.options.root = 'http://attendancemanagerapi.azurewebsites.net/';

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: routesConfig
});

/* eslint-disable no-unused-vars */
const app = new Vue({
  el: '#app',
  router,
  components: {Navbar}
});
