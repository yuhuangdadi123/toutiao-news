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

    <!-- tab栏 -->
    <div class="tab">
        <!-- v-model：就是当前的索引值，是唯一的，比较类似于for循环的key -->
        <!-- sticky：是否使用粘性定位布局 -->
        <!-- swipeable: 是否开启手势滑动切换 -->
        <van-tabs v-model="active" sticky swipeable>
        <van-tab v-for="(item, index) in categories" :title="item" :key="index">
        
         <!-- 假设list是后台返回的数组，里有10个元素 -->
                    <div v-for="(item, index) in list" :key="index">
                        <!-- 只有单张图片的 -->
                        <PostItem1/> 
                    </div>

        </van-tab>
        </van-tabs>
   
    </div>

</div>
</template>

<script>
// 文章列表的组件,只有单张图片的
import PostItem1 from "@/components/PostItem1"
// 大于等于3张图片的组件
import PostItem2 from "@/components/PostItem2"
// 视频的列表组件
import PostItem3 from "@/components/PostItem3"

export default {
    data(){
        return{
            categories:['关注','娱乐','体育','汽车','房产',
            '关注','娱乐','体育','汽车','房产','关注','∨'],
            active: 0,
            list: [1,1,1,1,1,1,1,1,1,1], // 10个1
        }
    },
    // 监听属性
    watch: {
        // 监听tab栏的切换
        active(){
            // 判断如果点击的是最后一个图标，跳转到栏目管理页
            if(this.active === this.categories.length - 1){
                this.$router.push("/栏目管理")
            }
        }
    },
    components: {
        PostItem1,
        PostItem2,
        PostItem3
    },
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


/deep/ .van-tabs__nav {
    background-color: #ebebea;
     position: static;
}

/deep/ .van-tab:nth-last-child(2){
    width: 1.111111rem!important;
    position: absolute;
    right:0; 
    top: 0;
    font-size: .694444rem;
    box-sizing:unset;
    background-color: #ebebea;
}

/deep/ .van-tabs__line{
    display: none;
}

/deep/ .van-tab--active{
    border-bottom: 3px #ff0000 solid;
}

/deep/ .van-tab{
    flex-basis: 20%!important;
}

/deep/ .van-tabs__wrap{
    padding-right: 1.388889rem;
}


</style>