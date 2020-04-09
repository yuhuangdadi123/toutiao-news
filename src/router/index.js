import Vue from 'vue'
// 导入路由
import VueRouter from 'vue-router'

// 注册路由的插件，把路由关联到vue。固定要加的
Vue.use(VueRouter)

const routes = [
	{	
		// 路由重定向到登录页
		path: "/",
		component: () => import("../views/index1")
	},
  	{	
		// 登录页
		path: "/login",
		component: () => import("../views/Login")
	},
	{	
		// 注册页
		path: "/register",
		component: () => import("@/views/Register"),
		meta: {
			// 代表这个页面需要授权
			authorization: true
		}
	},
	// {
	//自己写的个人中心布局
	// 	path: "/usercenter",
	// 	component: () => import("@/views/Usercenter")
	// },
	{
		// 个人中心页
		path: "/personal",
		component: () => import("@/views/Personal"),
		meta: {
			// 代表这个页面需要授权
			authorization: true
		}
	},
	{
		// 编辑页
		path: "/edit",
		component: () => import("@/views/Edit"),
		meta: {
			// 代表这个页面需要授权
			authorization: true
		}
	},
	{
		// 关注页
		path: "/follow",
		component: () => import("@/views/Follow"),
		meta: {
			// 代表这个页面需要授权
			authorization: true
		}
	},
	{
		// 跟帖页
		path: "/comments",
		component: () => import("@/views/Comments"),
		meta: {
			// 代表这个页面需要授权
			authorization: true
		}
	},
	{
		// 收藏页
		path: "/star",
		component: () => import("@/views/Star"),
		meta: {
			// 代表这个页面需要授权
			authorization: true
		}
	},
	{
		// 栏目管理页
		path: "/category",
		component: () => import("@/views/Category")
	},
	{
		// 搜索页
		path: "/search",
		component: () => import("@/views/Search")
	},
	{
		// 文章详情页
		path: "/post/:id",
		component: () => import("@/views/Post")
	},
	{
		// 视频文章详情页
		path: "/video/:id",
		component: () => import("@/views/Video")
	},
	{
		// 文章的跟帖列表页面
		path: "/post-comment/:id",
		component: () => import("@/views/PostComment")
	}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
