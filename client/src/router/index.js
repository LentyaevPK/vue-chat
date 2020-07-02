import Vue from "vue";
import VueRouter from "vue-router";
import InputForm from '../components/InputForm'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: InputForm
  },
  {
    path: '/chat',
    component: () => import('../components/ChatPage')
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
