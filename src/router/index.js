import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{
		path: "/",
		component: () => import("../views/Login")
	},
  	{
		path: "/login",
		component: () => import("../views/Login")
	},
	{
		path: "/register",
		component: () => import("@/views/Register")
	},
	{
		path: "/usercenter",
		component: () => import("@/views/Usercenter")
	},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
