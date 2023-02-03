/** @format */

import { createRouter, createWebHashHistory } from "vue-router";
import table from "./components/table.vue";
import users from "./components/details.vue";
import update from "./components/update.vue";

const routes = [
  { path: "/table", component: table },
  //{ path: "/table:/id", component: table },
  { path: "/users", component: users },
  // { path: "/edit", component: update },
  { path: "/edit/:id", component: update },
];
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});

export default router;
