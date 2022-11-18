import { createRouter, createWebHashHistory } from "vue-router";

import Home from "../views/index/index.vue";
import User from "../views/user/index.vue";
import App from "../views/app/index.vue";
import Order from "../views/order/index.vue";
import Settings from "../views/settings/index.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/user",
    component: User,
  },
  {
    path: "/app",
    component: App,
  },
  {
    path: "/order",
    component: Order,
  },
  {
    path: "/settings",
    component: Settings,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
