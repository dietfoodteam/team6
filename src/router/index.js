import Vue from "vue"
import VueRouter from "vue-router"
import Post from "../views/PostItem.vue"
import PostCoordinate from "../views/PostCoordinate.vue"
import Closet from "../views/Closet.vue"
import ClosetDetail from "../views/DetailItem.vue"
import SignIn from "../views/SignIn.vue"
import firebase from "firebase"
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Root",
    component: Closet,
  },
  {
    path: "/login",
    name: "Login",
    component: SignIn,
  },
  {
    path: "/Post",
    name: "Post",
    component: Post,
  },
  {
    path: "/PostCoordinate",
    name: "PostCoordinate",
    component: PostCoordinate,
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

router.beforeEach((to, from, next) => {
  const isAuth = firebase.auth().currentUser
  if (to.name !== "Login" && !isAuth) next({ name: "Login" })
  else next()
})

export default router
