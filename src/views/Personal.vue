<template>
  <div class="banxin">

      <!-- 顶部的导航条 -->
 		<div class="navigate-bar">
 			<!-- $router.back()是实例下的属性，可以直接在模板中渲染 -->
 			<span class="iconfont iconjiantou2" @click="$router.back()"></span>
 			<strong>个人中心</strong>
 			<!-- $router.push()是实例下的属性，可以直接在模板中渲染 -->
 			<span class="iconfont iconshouye" @click="$router.push('/')"></span>
 		</div>

      <!-- 头部 -->
    <div class="header">
        <!-- 头像 -->
      <div class="avatar">
          <!-- 获取的数据是head_img: "/uploads/image/default_avatar.jpg"  -->
          <!-- 需要在前面加上基准路径 -->
          <img :src="$axios.defaults.baseURL + userInfo.head_img">
      </div>
      <!-- 姓名 -->
      <div class="profile">
          <div>
              <!-- 性别男的图标 -->
 			    <span class="iconfont iconxingbienan" 
 				v-if="userInfo.gender === 1"></span>
 				<!-- 性别女的图标 -->
 				<span class="iconfont iconxingbienv" 
 				v-if="userInfo.gender === 0"></span>
              {{userInfo.nickname}}
              <!-- <p>{{ userInfo.create_date.split('T')[0] }}</p> -->
              <p>{{ moment(userInfo.create_date).format('YYYY-MM-DD') }}</p>
          </div>
      </div>
          <!-- 箭头 -->
          <span class="iconfont iconjiantou1"></span>
    </div>

    <Listbar v-for="(item,index) in rows" :key="index"
    :label="item.label"
    :tips="item.tips">
    </Listbar>

    <!-- handleClick点击退出按钮时候触发 -->
 	<!-- click.native这个事件类型，会给Listbar这个组件最外部的div强制绑定点击事件
 	不要去跟事件传递作比较 -->
 	<Listbar @click.native="handleClick" label="退出"/>

  </div>
</template>

<script>
// 导入列表按钮栏的组件，import后面接上的组件变量名（变量就意味着可以随便改名字）
// @代表src目录
import Listbar from "@/components/Listbar"
import moment from "moment";

export default {
    data(){
        return {
            rows: [
				{ label: "我的关注", tips: "关注的用户" },
				{ label: "我的跟帖", tips: "跟帖回复" },
				{ label: "我的收藏", tips: "文章视频" },
            ],
            userInfo: {},
 	        moment, 
        } 
    },
    // 个人的详细信息,初始值给一个对象
 	
 	// moment是日期处理的工具库，为了在模板中可以使用，所以需要绑定在data中
    // 注册组件,导入的子组件都必须注册才可以再模板渲染
	components: {
		Listbar
    },
    // 组件加载完后触发 类似location.onload  把数据渲染页面
    mounted(){
        // 从本地获取token和id
        // 把字符串转成对象,userJson就是用户的信息对象
        const userJson = JSON.parse(localStorage.getItem("userInfo"));
        // console.log(userJson);
        this.$axios({
            method:"get",
            url:"/user/" + userJson.user.id,
            headers : {
                Authorization:userJson.token
            }
        }).then(res=>{
            // console.log(res);
            const {data} = res.data;
             // 赋值给data的userInfo
             console.log(data);
 			this.userInfo = data;
        })
    },
    methods:{
        handleClick(){
            // 询问用户是否确定退出
 			this.$dialog.confirm({
 				title: '提示',
 				message: '确定退出吗？'
 			}).then(() => {
 				// 点击确定时候触发的函数				
 				// 清除本地的存储的用户数据
 				localStorage.removeItem("userInfo");
 				// 跳转到登录页,必须要使用replace 或 push。因为退出不可能再返回个人中心
 				this.$router.replace("/login");
 			}).catch(() => {
 				// 点击取消按钮触发的函数
 			});
        }
    }
}
</script>

<style lang="less" scoped>

.navigate-bar{
 	line-height: 1.388889rem;
 	display: flex;
 	justify-content: space-between;
 	align-items:center;
 	padding: .138889rem .555556rem;
 	border-bottom:1px #eee solid;

 	.iconshouye{
 		font-size: .555556rem;
     }
     
     strong {
         font-size: .555556rem;
         font-family: '楷体';
         color: #2bd4ee;
     }
 }

.header{
    padding: .555556rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 5px #eee solid;

    .avatar {
        img {
            display: block;
            width: 1.944444rem;
            height: 1.944444rem;
            border-radius: 50%;
            object-fit: cover;
        }
    }

    .profile {
        flex: 1;
        padding-left: .555556rem;
        font-size: .444444rem;
        line-height: 1.5;
        
        p{
            color: #555;
        }

        .iconxingbienan{
 			color: blue;
 		}

 		.iconxingbienv{
 			color: palevioletred;
 		}

    }

}





</style>