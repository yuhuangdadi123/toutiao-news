<template>
    <div class="banxin">
        <!-- 关闭按钮 -->
        <div class="iconfont iconicon-test"></div>
        <!-- 登录表单 -->
        <div class="login-form">
            <!-- logo -->
            <div class="iconfont iconnew"></div>
            <input type="text" placeholder="用户名 / 手机号码">
            <input type="text" placeholder="昵称">
            <input type="password" placeholder="密码">
            <button>注册</button>
            <div class="reminder">已有账号？<a href="http://localhost:8080/login">去登录</a></div>
        </div>
    </div>
</template>
<script>
export default {
    
};
</script>
<style>
.banxin {
    background-color: #f2f2f2;
    border-top: .130208rem solid #757575;
}

.iconicon-test {
    font-size: .651042rem;
    color: #000000;
    margin: .520833rem 0 0 .651042rem;
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

.login-form input {
    border:0;
    outline: none;
    border-bottom: 1px solid #000;
    background-color: #f2f2f2;
    width: 7.8125rem;
    height: 1.302083rem;
    font-size: .46875rem;
    color: #949494;
    margin:.260417rem 0 .260417rem 0;
}

.login-form button {
    width: 7.03125rem;
    height: 1.302083rem;
    background-color: #cc3300;
    color: #fff;
    font-size: .46875rem;
    margin: .78125rem 0 .78125rem 0;
    border-radius: .520833rem;
}

.reminder {
    font-size: .46875rem;
}

.reminder a {
    color: #cc3300;
}








</style>