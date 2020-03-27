<template>
    <div class="banxin">
        <!-- 关闭按钮 -->
        <div class="iconfont iconicon-test"></div>
        <!-- 登录表单 -->
        <div class="login-form">
            <!-- logo -->
            <div class="iconfont iconnew"></div>
            <!-- <input type="text" placeholder="用户名 / 手机号码" v-model="form.username">
            <input type="password" placeholder="密码" v-model="form.password">
            <button @click="handleclick">登录</button>
            <div class="reminder">还没账号？<a href="http://localhost:8080/register">去注册</a></div> -->
            <van-form @submit="onSubmit" class="login-form">
            <van-field
                v-model="form.username"
                name="用户名 / 手机号码"
                placeholder="用户名 / 手机号码"
                :rules="[{ required: true, message: '请填写用户名/ 手机号码' }]"
            />
            <van-field
                v-model="form.password"
                type="password"
                name="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">
                登录
                </van-button>
            </div>
            </van-form>
            <router-link to="/register">
            <van-button round block class="link-register" >
                去注册
            </van-button>
        </router-link>
        </div>
    </div>
</template>
<script>
export default {
    data(){
       return{
           form:{
            username:'',
            password:''
           }
        }
    },
    methods:{
        onSubmit(values){
        this.$axios({
            url:"/login",
            method:"post",
            data:this.form
        }).then(res=>{
            // console.log(res);
            // const {message} = res.data;
            const {message, data} = res.data;
            // 登录成功提示
            this.$toast.success(message);
            // 把data存到本地存储里面
             // localStorage只能保存字符串，需要使用JSON.stringify来把对象转换成字符串
            localStorage.setItem('userInfo',JSON.stringify(data));
            this.$router.push("/personal");
        })
    }
    }
};
</script>
<style lang="less" scoped>
.banxin {
    // border-top: .130208rem solid #757575;
    background-color: #f2f2f2;
    padding-top: .533333rem;
}

.iconicon-test {
    font-size: .651042rem;
    color: #000000;
    margin: 0 0 0 .651042rem;
}

.login-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.iconnew {
    font-size: 3.385417rem;
    color: #d71e06;
}

.login-form{
    margin-top: .520833rem;
}

.login-form .van-cell {
    border:0;
    outline: none;
    border-bottom: 1px solid #000;
    background-color: #f2f2f2;
    width: 7.8125rem;
    height: 1.2rem;
    // line-height: 1.6rem;
    padding: 0;
    font-size: .426667rem;
    color: #949494;
    margin:.260417rem 0 .260417rem 0;
}

.login-form button {
    width: 7.8125rem;
    height: 1.302083rem;
    background-color: #cc3300;
    color: #fff;
    font-size: .46875rem;
    margin: .78125rem 0 0 0;
    border-radius: .520833rem;
    border:0;
    outline: none;
}








</style>