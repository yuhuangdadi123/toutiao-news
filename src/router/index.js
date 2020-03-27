import Vue from 'vue'
// 导入路由
import VueRouter from 'vue-router'

// 注册路由的插件，把路由关联到vue。固定要加的
Vue.use(VueRouter)

const routes = [
	{	
		// 路由重定向到登录页
		path: "/",
		component: () => import("../views/Login")
	},
  	{	
		// 登录页
		path: "/login",
		component: () => import("../views/Login")
	},
	{	
		// 注册页
		path: "/register",
		component: () => import("@/views/Register")
	},
	// {
	//自己写的个人中心布局
	// 	path: "/usercenter",
	// 	component: () => import("@/views/Usercenter")
	// },
	{
		// 个人中心页
		path: "/personal",
		component: () => import("@/views/Personal")
	},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
