import Vue from "vue";
import VueRouter from "vue-router";
import SearchPage from "../views/SearchPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: SearchPage
  }
];

const router = new VueRouter({
  routes
});

export default router;
