import Vue from "vue"
import VueRouter from "vue-router"

import Home from "../views/Home.vue"
import Login from "../views/Login.vue"
import Register from "../views/Register.vue"

import Practice from "../views/Practice.vue"
import Quiz from "../views/Quiz.vue"
import Results from "../views/Results.vue"

import CategoryList from "../views/Category/CategoryList.vue"
import QuestionList from "../views/Question/QuestionList.vue"
import QuestionAdd from "../views/Question/QuestionAdd.vue"
import QuestionEdit from "../views/Question/QuestionEdit.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { authOnly: true }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { guestOnly: true }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { guestOnly: true }
  },
  {
    path: "/category",
    name: "CategoryList",
    component: CategoryList,
    meta: { authOnly: true }
  },
  {
    path: "/question",
    name: "QuestionList",
    component: QuestionList,
    meta: { authOnly: true }
  },
  {
    path: "/question/add",
    name: "QuestionAdd",
    component: QuestionAdd,
    meta: { authOnly: true }
  },
  {
    path: "/question/edit/:id",
    name: "QuestionEdit",
    component: QuestionEdit,
    meta: { authOnly: true },
    props: true
  },
  {
    path: "/practice",
    name: "Practice",
    component: Practice,
    meta: { authOnly: true }
  },
  {
    path: "/practice/quiz",
    name: "Quiz",
    component: Quiz,
    meta: { authOnly: true }
  },
  {
    path: "/practice/quiz/results",
    name: "Results",
    component: Results,
    meta: { authOnly: true }
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

function isLoggedIn() {
  return JSON.parse(localStorage.getItem("user")) !== null
}

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.authOnly)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!isLoggedIn()) {
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else if (to.matched.some((record) => record.meta.guestOnly)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (isLoggedIn()) {
      next({
        path: "/home",
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
