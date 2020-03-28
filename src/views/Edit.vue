<template>
  <div>

    <!-- 头部导航组件 -->
    <NavigateBar title="编辑资料" />
    <!-- 头像 -->
    <div class="avatar">
        <img :src="$axios.defaults.baseURL + userInfo.head_img" alt="">
        <!-- 添加上传组件，设置透明度为0 -->
        <!-- 这是一个按钮来的，点击上传头像 -->
        <van-uploader :after-read="afterRead" class="uploader" />
    </div>
    <!-- 按钮列表 -->
    <!-- 点击昵称的时候 把this.show 改成 true 让弹窗显示 -->
    <Listbar label="昵称" 
    :tips="userInfo.nickname" 
     @click.native="show=true" />
    <!-- 编辑昵称的弹窗 -->
    <!-- 这里的v-model的作用 只要控制显示或隐藏弹窗 -->
    <van-dialog v-model="show" title="修改昵称" show-cancel-button>
    <van-field v-model="value" placeholder="请输入用户名" />
    </van-dialog>


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
            userInfo:{},
            // 本地的用户数据
            userJson: {},
            // 是否显示 编辑昵称的弹窗
            show:false,
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
        // console.log(userJson);
        // 保存到data，就可以在methods的方法是调用了
         this.userJson = userJson;

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
    },
    methods:{
        // 图片上传方法
        afterRead(file){
            //创建一个表单对象，上传图片资源 必须是表单形式，不能是json
            const fd = new FormData();
            //append 给表单添加元素， 
            //第一个字符串file表示接口属性，第二个是我们获取的对象
            fd.append("file",file.file)
            // console.log(file);
            this.$axios({
                method:"post",
                url:"/upload",
                headers : {
                Authorization:this.userJson.token
                },
                data:fd
            }).then(res=>{
                // console.log(res);
                // 解构出来的url就是图片路径
                const {url} = res.data.data;
                // 因为上面的img  src 里面已经加了基地址，所以直接赋值
                this.userInfo.head_img = url;
                // 单纯了上传一张图片 没有修改用户的头像信息，
                // 还要去编辑用户的axios里面去处理
                // 所以封装一个函数方法，上传了就调用方法，修改到后台
                this.handleEdit({
                    head_img:url
                })
            })
        },

        













        //编辑用户信息的函数
        handleEdit(data){
            this.$axios({
                // 获取用户详情的时候，已经把用户信息保存在userInfo里面了
                url:"/user_update/" + this.userInfo.id,
                method:"post",
                headers : {
                Authorization:this.userJson.token
                },
                data:data,
            }).then(res=>{
                // console.log(res);

            })
        }


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
    position: relative;
    
    .uploader {
        position: absolute;
        width: 2.777778rem;
        height: 2.777778rem;
        left: 50%;
        top: 50%;
        transform: translateX(-1.388889rem) translateY(-1.388889rem);
        opacity: 0;
    }

    img{
        width: 2.777778rem;
        height: 2.777778rem;
        border-radius: 50%;
    }
}

















</style>