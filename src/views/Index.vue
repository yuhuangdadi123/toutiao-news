<template>
<div>
   <!-- 红色头部 -->
   <div class="header">
       <!-- logo -->
       <span class="iconfont iconnew"></span>
       <!-- 搜索框 -->
       <router-link to='#' class="search">
           <span class="iconfont iconsearch"></span>
            <span>搜索新闻</span>
       </router-link>
        <!-- 去到个人中心 -->
       <router-link to="/personal">
            <span class="iconfont iconwode"></span>
        </router-link>
   </div>





</div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
.header {
    background-color: #ff1a00;
    height: 1.111111rem;
    display: flex;
    padding: .555556rem;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    font-size: .444444rem;

    .iconnew{
        font-size:.555556rem;
        transform: scale(3.5);
        position: relative;
        left: .555556rem;
    }

    .search{
        flex: 1;
        height: 1.111111rem;
        margin: 0 1.388889rem 0 1.666667rem;
        background: rgba(255,255,255,0.5);
        display: flex;
        justify-content: center;
        align-items:center;
        border-radius: 1.388889rem;
        font-size: 13px;
        line-height: 1;
        vertical-align: middle;
    }

    .iconwode{
        font-size: .694444rem;
        position: relative;
        right: .277778rem;
    }

}














</style>