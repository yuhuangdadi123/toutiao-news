<template>
  <div class="main">
    <!-- 头部 -->
    <div class="header">
      <div class="left">
        <span class="iconfont iconjiantou2"></span>
        <span class="iconfont iconnew"></span>
      </div>
      <!-- active表示红色的 -->
      <!-- 如果关注是false，就加上active这个class，显示一个红色按钮 -->
      <span class="follow" :class="post.has_follow ? '' : 'active'">
        {{ post.has_follow ? "已关注" : "关注" }}
      </span>
    </div>
    <!-- 标题 -->
    <h2 class="title">{{post.title}}</h2>
    <!-- 作者昵称 日期 -->
    <p class="author">
        {{post.user.nickname}}   
        {{moment(post.create_date).format(`YYYY-MM-DD hh:mm:ss`)}}
    </p>
    <!-- 文章的详情 -->
        <div class="content" v-html="post.content"></div>
    <!-- 点赞 跟 微信 两个按钮 -->
    <div class="btn">
      <div class="btn-item">
        <span class="iconfont icondianzan"></span>
        <i>{{ Number(post.has_like) }}</i>
      </div>
      <div class="btn-item">
        <span class="iconfont iconweixin"></span>
        <i>微信</i>
      </div>
    </div>

    <!-- 固定在底部的底部栏 -->
    <div class="footer">
      <!-- 点击跳转到评论页 -->
      <div class="comment-input">发布评论</div>
      <van-icon name="chat-o" :badge="post.comment_length > 100 ? `99+` : post.comment_length" />
      <!-- 如果当前是收藏的状态显示一个红色的按钮 -->
      <div class="icons">
        <!-- 如果当前是收藏的，就添加active这个class，显示一个红色的按钮 -->
        <span class="iconfont iconshoucang" 
        :class="post.has_star ? `active`: ''"></span>
      </div>
      <!-- 这个按钮是一个装饰用的，微信分享需要企业的资质 -->
      <div class="icons">
        <span class="iconfont iconfenxiang"></span>
      </div>
    </div>
  </div>
</template>

<script>
// 时间转换工具库
import moment from "moment";

export default {
  data() {
    return {
      post: {},
      moment,
    };
  },
  mounted() {
    // 请求文章详情
    this.$axios({
      url: "/post/" + this.$route.params.id,
    }).then((res) => {
      // console.log(res);
      // data是文章的详情
      const { data } = res.data;
      this.post = data;
    });
  },
};
</script>

<style scoped lang="less">
.main{
    margin-bottom: 2.777778rem;
}

.header {
  display: flex;
  padding: 0 0.555556rem;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    align-items: center;
    // vertical-align: middle;
    .iconjiantou2 {
      line-height: 1.638889rem;
      font-size: 0.5rem;
    }
    .iconnew {
      font-size: 1.638889rem;
    }
  }
  .follow {
    margin-right: 0.555556rem;
    width: 1.666667rem;
    height: 0.833333rem;
    border: 0.027778rem solid #999;
    line-height: 0.833333rem;
    text-align: center;
    border-radius: 0.277778rem;
    font-size: 0.388889rem;
  }
  .active {
    background-color: #ff0000;
    color: #fff;
    border-color: red;
  }
}
.title {
  padding: 0 0.555556rem 0.277778rem 0.555556rem;
  font-size: 0.5rem;
}

.author {
  font-size: 0.388889rem;
  padding: 0 0.555556rem;
  color: #999;
}

.content {
  font-size: 0.444444rem;
  padding: 0.416667rem;
  // 不是本页面的标签或者类型，都可以通过/deep/来访问
    /deep/ img{
        max-width: 100%;
    }
}

.btn {
  display: flex;
  justify-content: space-around;
  margin-top: 0.833333rem;
  padding: 0 1.388889rem;

  .btn-item {
    display: flex;
    align-items: center;
    border: 1px #999 solid;
    padding: 0.138889rem 0.416667rem;
    border-radius: 50px;
    font-size: 12px;

    span {
      margin-right: 5px;
    }
    .iconweixin {
      color: #00c800;
    }

    i {
      font-size: 0.388889rem;
    }
  }
}

.footer {
    background-color: #fff;
  padding: 0.277778rem 0.555556rem;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  .comment-input {
    font-size: 0.388889rem;
    background-color: #d7d7d7;
    flex: 1;
    height: 0.833333rem;
    margin-right: 0.555556rem;
    padding: 0 0.555556rem;
    line-height: 0.833333rem;
    border-radius: 1.388889rem;
  }

  .icons {
    .iconfont {
      font-size: 0.555556rem;
      margin: 0 0.277778rem;
    }
    .active{
        color: red;
    }
  }
}

/deep/ .van-icon {
  font-size: 0.555556rem;
  margin: 0 0.277778rem;
}
</style>
