<template>
  <div class="banxin">
    <!-- 顶部的导航条 -->
    <NavigateBar title="我的跟帖"  />

    <!-- 要循环的结构 -->
    <div class="comments" v-for="(item,index) in comments" :key="index" >

        <!-- 日期 -->
        <div class="date">
            {{ moment(item.create_date).format("YYYY-MM-DD hh:mm") }}
        </div>
        <div class="parent" v-if="item.parent">
            <!-- 回复了谁 -->
            <div class="parent-user">回复：{{item.parent.user.nickname}}</div>
            <!-- 回复的内容 -->
            <div class="parent-content">{{item.parent.content}}</div>
        </div>

        <!-- 自己发布的内容 -->
        <div class="comments-contents">
            {{item.content}}
        </div>
        <!-- 点击跳转到原文 -->
            <router-link to="#" class="link-post">
                <div>原文：{{item.post.title}}</div>
                <span class="iconfont iconjiantou1"></span>
            </router-link>
    </div>

  </div>
</template>

<script>
import NavigateBar from "@/components/navigateBar"
//日期处理类库
import moment from "moment";


export default {
    data(){
        return{
            comments:[],
            moment,
        }
    },
    components: {
        NavigateBar
    },
    mounted(){
        //本地数据
        const userJson = JSON.parse(localStorage.getItem('userInfo'));
        //请求评论列表
        this.$axios({
            url:"/user_comments",
            headers : {
                Authorization : userJson.token
            },
        }).then(res=>{
            // console.log(res);
            const {data} = res.data;
            this.comments = data;
        })
    }




}
</script>

<style scoped lang="less">
.banxin {
    padding: .138889rem;
}

.comments  {
    padding: .555556rem;
    font-size: .444444rem;
    line-height: .833333rem;
    border-bottom: #aaa .027778rem solid;

    .date{
        color: #999;
        margin-bottom: .277778rem;
    }

    .parent{
        color: #888;
        padding: .277778rem;
        background-color: #eee;
        // line-height: .833333rem;
    }

    .comments-contents {
        margin: .277778rem;
    }

    .link-post{
        display: flex;
        justify-content: space-between;
        align-items: center;
        color:#999;
        
        div{
            flex: 1;
            // 文字超出出现省略号一定是块元素才有作用
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
        span{
            margin-left: 5px;
        }
    }


}



















</style>