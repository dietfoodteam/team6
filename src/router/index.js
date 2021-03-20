import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
import About from "../views/About.vue"
import Post from "../views/Post.vue"
import Closet from "../views/Closet.vue"
import ClosetDetail from "../views/DetailItem.vue"
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
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
  {
    path: "/Closet/:id",
    name: "ClosetDetail",
    component: ClosetDetail,
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
