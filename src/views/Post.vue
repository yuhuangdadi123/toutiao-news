<template>
  <div class="main">
    <!-- 头部 -->
    <div class="header">
      <div class="left">
        <span class="iconfont iconjiantou2" @click="$router.back()"></span>
        <span class="iconfont iconnew"></span>
      </div>
      <!-- active表示红色的 -->
      <!-- 如果关注是false，就加上active这个class，显示一个红色按钮 -->
      <span class="follow" :class="post.has_follow ? '' : 'active'" 
      @click="handleFollow">
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
        <span class="iconfont icondianzan" @click="handleLike"></span>
        <i>{{ post.like_length }}</i>
      </div>
      <div class="btn-item">
        <span class="iconfont iconweixin"></span>
        <i>微信</i>
      </div>
    </div>

    <!-- 底部栏组件 -->
      <PostFooter :post="post"/>
  </div>
</template>

<script>
// 时间转换工具库
import moment from "moment";
// 导入底部栏组件
import PostFooter from "@/components/PostFooter";

export default {
  data() {
    return {
      post: {
        // 为什么要加这个默认值，因为模板需要访问post.user.nickname
        user: {}
        },
      moment,
      token:'',
    };
  },
  components: {
        PostFooter
    },
  mounted() {
    const {token} = JSON.parse(localStorage.getItem('userInfo'));
    this.token = token;
    const config = {
      url: "/post/" + this.$route.params.id,
    }
    if(token){
      config.headers = {
        Authorization:token
      }
    }
    // 请求文章详情
    this.$axios(config).then((res) => {
      // console.log(res);
      // data是文章的详情
      const { data } = res.data;
      this.post = data;
    });
  },

    methods:{
        // 关注的方法
        handleFollow(){
            // if(this.post.has_follow)return;
            let url = ""
            if(this.post.has_follow){
              //取消关注
              url = "/user_unfollow/" + this.post.user.id
            }else{
              //关注
              url = '/user_follows/' + this.post.user.id
            }

            this.$axios({
                url,
                headers: {
                    Authorization: this.token
                }
            }).then(res => {
                // 关注成功之后修改关注状态
                this.post.has_follow = !this.post.has_follow;
                this.$toast.success(this.post.has_follow ? "关注成功" : '取消关注成功')
            })
        },
        // 文章点赞
        handleLike(){
          this.$axios({
            url: "/post_like/" + this.post.id,
            headers: {
                Authorization: this.token
              }
          }).then(res=>{
            // 修改点赞的状态
            this.post.has_like = !this.post.has_like;
            // 判断当前是否点赞
            if(this.post.has_like){
                // 如果是点赞就加1
                this.post.like_length += 1;
            }else{
                // 取消点赞就减1
                this.post.like_length -= 1;
            }
            // 弹窗提示
            this.$toast.success(res.data.message);
          })
        },

        // // 收藏
        // handleStar(){
        //   this.$axios({
        //     url:"/post_star/" + this.post.id,
        //     headers: {
        //       Authorization: this.token
        //     }
        //   }).then(res=>{
        //     // 收藏状态取反
        //     this.post.has_star = !this.post.has_star;
        //     // 弹窗提示
        //     this.$toast.success(res.data.message);
        //   })
        // }

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
