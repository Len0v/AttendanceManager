import Hello from '../pages/hello/hello.vue';
import Error from '../pages/404.vue';
import EventsList from '../pages/events/events-list-page/events-list.vue';

const routes = [
  {path: '/', redirect: '/home'},
  {path: '/home', component: Hello},
  {path: '/error', component: Error},
  {path: '/events', component: EventsList},
  {path: '*', redirect: '/error'}
];

export default routes;
