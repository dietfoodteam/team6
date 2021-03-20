import Vue from "vue"
import VueRouter from "vue-router"
import Post from "../views/Post.vue"
import Closet from "../views/Closet.vue"

Vue.use(VueRouter)

const routes = [
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
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
