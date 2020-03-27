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
                v-model="form.nickname"
                name="昵称"
                placeholder="昵称"
                :rules="[{ required: true, message: '请填写昵称' }]"
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
                注册
                </van-button>
            </div>
            </van-form>
            <router-link to="/login">
            <van-button round block class="link-register" >
                去登录
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
            username: "",
            nickname: "", // 昵称
            password: ""
           }
        }
    },
    methods:{
        onSubmit(values){
        this.$axios({
            url:"/register",
            method:"post",
            data:this.form
        }).then(res=>{
            console.log(res);
            const {message} = res.data;
            this.$toast.success(message);
        })
    }
    }
};
</script>
<style lang="less" scoped>
.banxin {
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