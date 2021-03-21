import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

import About from "../views/About.vue"
import Post from "../views/Post.vue"
import Closet from "../views/Closet.vue"

/*ここから新規追加*/
import Singup from "../components/singup.vue";
import Singin from "../components/singin.vue";
import Singout from "../components/singout.vue";
import Mypage from "../components/mypage.vue";
/*ここまで*/

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  /*ここから新規追加*/
  {
    path: "/singup",
    name: "singup",
    component: Singup
  },
  {
    path: "/singin",
    name: "singin",
    component: Singin
  },
  {
    path: "/singout",
    name: "singout",
    component: Singout
  },
  {
    path: "/mypage",
    name: "mypage",
    component: Mypage
  },
  /*ここまで*/
 
  {
    path: "/mypage",
    name: "mypage",
    component: Mypage,
    meta: { requiresAuth: true }
  },

  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/Post",
    name: "Post",
    component: Post,
  },
  {
    path: "/Closet",
    name: "Closet",
    component: Closet,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(recode => recode.meta.requiresAuth);
  if (requiresAuth && !(await firebase.getCurrentUser())) {
    next({ path: "/singin", query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

export default router;