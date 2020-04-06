<template>
  <div>
   
       <!-- 头部 -->
    <div class="header">
        <div class="left">
            <span class="iconfont iconjiantou2"></span>
            <span class="iconfont iconnew"></span>
        </div>
    <!-- active表示红色的 -->
        <span class="follow active">
             关注
        </span>
    </div>
    <!-- 标题 -->
    <h2 class="title">内容内容内容内容内容内容内容内容内容内容</h2>
    <!-- 作者昵称 日期 -->
    <p class="author">火星时报    2019-10-10</p>
    <div class="content">
        内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
        内容内容内容内容内容内容内容内容内容内容
        内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
    </div>
    <!-- 点赞 跟 微信 两个按钮 -->
    <div class="btn">
        <div class="btn-item">
            <span class="iconfont icondianzan"></span> 
            <i>122</i>
        </div>
        <div class="btn-item">
            <span class="iconfont iconweixin"></span> 
            <i>微信</i>
        </div>
    </div>

  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
.header {
    display: flex;
    padding: 0 .555556rem;
    justify-content: space-between;
    align-items: center;
    .left{
        display: flex;
        align-items: center;
        // vertical-align: middle;
        .iconjiantou2{
            line-height: 1.638889rem;
            font-size: .5rem;
        }
        .iconnew{
            font-size: 1.638889rem;
        }
    }
    .follow {
        margin-right: .555556rem;
        width: 1.666667rem;
        height: .833333rem;
        border: .027778rem solid #999;
        line-height: .833333rem;
        text-align: center;
        border-radius: .277778rem;
        background-color: #ff0000;
        color: #fff;
        font-size: .388889rem;
    }

}
    .title{
        padding: 0 .555556rem .277778rem .555556rem;
        font-size: .5rem;
    }

    .author{
        font-size: .388889rem;
        padding: 0 .555556rem;
        color: #999;
    }

    .content {
        font-size: .444444rem;
        padding: .416667rem;

    }

    .btn {
        display: flex;
        justify-content: space-around;
        margin-top: .833333rem;
        padding: 0 1.388889rem;

        .btn-item{
             display: flex;
            align-items: center;
            border: 1px #999 solid;
            padding: 3px 10px;
            border-radius: 50px;
            font-size: 12px;

            span{
                margin-right: 5px;
            }
            .iconweixin{
                color: #00c800;
            }
        }
    }


</style>