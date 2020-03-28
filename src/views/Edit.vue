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

    <!-- 昵称部分 -->
    <!-- 点击昵称的时候 把this.show 改成 true 让弹窗显示 -->
    <Listbar label="昵称"  :tips="userInfo.nickname" @click.native="show=true" />
    <!-- 编辑昵称的弹窗 -->
    <!-- 这里的v-model的作用 只要控制显示或隐藏弹窗 -->
    <van-dialog v-model="show" title="修改昵称" show-cancel-button @confirm="handleChangeNickname">
    <!-- 弹窗里面的input -->
    <van-field v-model="nickname" placeholder="请输入用户名" />
    </van-dialog>
    

    <!-- 密码部分 -->
    <Listbar label="密码" tips="******" @click.native="showPassword=true"/>
    <!-- 修改密码弹窗 -->
    <van-dialog v-model="showPassword" title="修改密码" show-cancel-button @confirm="handleChangePassword">
    <!-- 弹窗里面的input -->
    <van-field v-model="password" placeholder="请输入密码" type="password" />
    </van-dialog>






    <!-- 性别部分 -->
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
            //是否显示修改密码弹窗
            showPassword:false,
            //单独记录昵称
            nickname:'',
            //单独记录密码
            password:'',
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
        // 请求用户详情
        this.$axios({
            url:"/user/" + userJson.user.id,
            headers : {
                Authorization:userJson.token
            }
        }).then(res=>{
            // console.log(res);
            const {data} = res.data;
            this.userInfo = data;

            //单独保存nickname给编辑的弹窗使用
            this.nickname = data.nickname;
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
            // 开始上传
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
                this.$toast.success('修改成功')
            })
        },

        // 弹出框修改昵称按确定  comfirm事件 触发 修改昵称的方法   （等于确定按钮的点击事件）
        handleChangeNickname(){
            // 调用编辑用户信息的函数
            this.handleEdit({ nickname:this.nickname });
            //同步修改当前显示的数据
            // 这个是弹出框按确定触发了 handleChangeNickname 这个方法  这个方法里面又去调用了handleEdit的方法
            // 然后才把修改后的再传，没有按确定 没有触发上面的函数方法 就不会出现没按确定就影响了
            this.userInfo.nickname = this.nickname;
        },

        handleChangePassword(){
             this.handleEdit({ password:this.password });
              this.userInfo.password = this.password;
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