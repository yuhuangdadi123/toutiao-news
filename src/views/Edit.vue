<template>
  <div>

    <!-- 头部导航组件 -->
    <NavigateBar title="编辑资料" />
    <!-- 头像 -->
    <div class="avatar">
        <img :src="$axios.defaults.baseURL + userInfo.head_img" alt="">
    </div>
    <!-- 按钮列表 -->
    <Listbar label="昵称" :tips="userInfo.nickname" />
    <Listbar label="密码" tips="******" />
    <Listbar label="性别" :tips="['女','男'][userInfo.gender]" />

  </div>
</template>

<script>
import Listbar from "@/components/Listbar"
import NavigateBar from "@/components/navigateBar"

export default {
    data(){
        return {
            // 用户详情
            userInfo:{}
        }
    },
    components: {
        Listbar,
        NavigateBar
    },
    mounted(){
        // 从本地存储里面拿到对象  对象里面有id
        const userJson = JSON.parse(localStorage.getItem('userInfo'))
        //请求用户详情
        this.$axios({
            url:"/user/" + userJson.user.id,
            headers : {
                Authorization:userJson.token
            }
        }).then(res=>{
            // console.log(res);
            const {data} = res.data;
            this.userInfo = data;
        })
    }

}
</script>

<style lang="less" scoped>
//头像的样式
.avatar{
    display: flex;
    padding: .555556rem;
    justify-content: center;
    align-items: center;
    img{
        width: 2.777778rem;
        height: 2.777778rem;
        border-radius: 50%;
    }
}

















</style>