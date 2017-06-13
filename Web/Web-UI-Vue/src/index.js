import './index.scss';
import '../node_modules/vuetify/dist/vuetify.min.css';

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Vuetify from 'vuetify';

import Navbar from './app/components/header/header.vue';
import EventsList from './app/pages/events/events-list-page/events-list.vue';
import Notifications from './app/components/notification.vue';

Vue.use(Vuetify);
Vue.use(VueRouter);
Vue.use(VueResource);

import store from './app/config/store';
import routesConfig from './app/config/routes';

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
  store,
  components: {
    Navbar,
    EventsList,
    Notifications
  }
});
