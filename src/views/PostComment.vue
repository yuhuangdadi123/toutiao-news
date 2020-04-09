<template>
  <div>
    <!-- 头部导航组件 -->
    <NavigateBar title="精彩跟帖"/>

    <!-- 跟帖评论列表 -->
        <div class="comment">
            <div class="comment-top">
                <div class="user">
                    <img src="https://img12.360buyimg.com/img/s100x100_jfs/t2770/142/2313361897/493911/1e5ea1db/575fd5f7N1cfc4411.jpg!cc_100x100.webp" alt="">
                    <div class="user-info">
                        <p>火星网友</p>
                        <span>2小时前</span>
                    </div>
                </div>
                <span class="reply">回复</span>
            </div>

         <!-- 回复的列表 -->
            <div class="comment-floor">
                <div class="floor-top">
                    <div class="user">
                        <span>1</span>
                        <em>火星网友</em>
                        <span>2小时前</span>
                    </div>
                    <span class="reply">回复</span>
                </div>
                <div class="content">
                    文章评论的回复
                </div>

                <!-- 第二级 -->
            <div class="comment-floor">
                <div class="floor-top">
                    <div class="user">
                        <span>1</span>
                        <em>火星网友</em>
                        <span>2小时前</span>
                    </div>
                    <span class="reply">回复</span>
                </div>
                <div class="content">
                    文章评论的回复
                </div>
                <!-- 第三级 -->
            <div class="comment-floor">
                <div class="floor-top">
                    <div class="user">
                        <span>1</span>
                        <em>火星网友</em>
                        <span>2小时前</span>
                    </div>
                    <span class="reply">回复</span>
                </div>
                <div class="content">
                    文章评论的回复
                </div>
                </div>
            </div>
        </div>

        <div class="content">
            文章说的很有道理！
        </div>
    </div>

  </div>
</template>

<script>
import NavigateBar from "@/components/navigateBar"

export default {


components: {
    NavigateBar
},

}
</script>

<style scoped lang="less">
.comment{
    
    padding: 15/360*100vw;
    border-bottom: 1px #ddd solid;
    font-size: 13px;
}
.comment-top{
    display: flex;
    justify-content: space-between;
    .user{
        display: flex;
        align-items: center;
        img{
            display: block;
            width: 35/360*100vw;
            height: 35/360*100vw;
            border-radius: 50%;
            margin-right: 5px;
        }
        span{
            color: #999;
            font-size: 12px;
        }
    }
    .reply{
        font-size: 12px;
    }
}

.content{
    margin-top: 10/360*100vw;
}
.comment-floor{
    margin-top: 10/360*100vw;
    border: 1px #ddd solid;
    padding: 3px 6px;
    .floor-top{
        display: flex;
        justify-content: space-between;
        padding: 5px;
        span{
            font-size: 12px;
            color: #999;
            margin-right:5px;
        }
        em{
            margin-right: 5px;
        }
    }
    .content{
        padding: 5px;
        padding-top: 0;
    }
}





</style>