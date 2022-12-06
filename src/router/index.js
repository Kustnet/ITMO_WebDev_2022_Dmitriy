import { createRouter, createWebHistory } from "vue-router";
import AppTodo from "../AppTodo.vue";
import Routes from "../Consts/Routes";
import TodoItemView from "../views/TodoItemView.vue";
import AboutView from "../views/AboutView.vue";

const TodoId = {
  template: "<div>ID {{ $route.params.id }}</div>",
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: Routes.HOME,
      name: "todos",
      component: AppTodo,
    },
    {
      path: "/todo/:id",
      name: "todo-id",
      component: TodoItemView,
    },
    {
      path: Routes.ABOUT,
      name: "about",
      component: AboutView,
    },
    {
      path: Routes.COUNTER,
      name: "counter",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../AppCounter.vue"),
    },
  ],
});

export default router;
