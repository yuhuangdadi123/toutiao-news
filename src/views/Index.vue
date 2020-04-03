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
        <van-tab v-for="(item, index) in categories" :title="item.name" :key="index">
        
             <!-- 下拉刷新 -->
            <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                <!-- van的列表组件 -->
                <!-- @load 滚动到底部时候触发的函数 -->
                <!-- immediate-check 这个属性可以阻止list组件默认就加载一次 -->
                <van-list
                    :immediate-check="false"
                    v-model="categories[active].loading"
                    :finished="categories[active].finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                >
                    <!-- 假设list是后台返回的数组，里有10个元素 -->
                    <div v-for="(item, index) in categories[active].posts" :key="index">
                            <!-- 只有单张图片的 -->
                            <PostItem1 
                            v-if="item.type === 1 && item.cover.length > 0 && item.cover.length < 3"
                            :data="item"/>

                            <!-- 大于等于3张图片 -->
                            <PostItem2 
                            v-if="item.type === 1 && item.cover.length >= 3"
                            :data="item"/>

                            <!-- 视频 -->
                            <PostItem3 
                            v-if="item.type === 2"
                            :data="item"/>
                    </div>
                </van-list>
            </van-pull-refresh>
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
            // categories:['关注','娱乐','体育','汽车','房产',
            // '关注','娱乐','体育','汽车','房产','关注','∨'],
            categories: [], //栏目列表
            active: 0,
            //list: [], //文章列表
             // 记录当前的栏目的id
            categoryId: 999,
            //loading: false, // 是否正在加载中
            //finished: false, // 是否已经加载完毕
            refreshing: false , // 是否正在下拉加载
        }
    },
    // 监听属性
    watch: {
        // 监听tab栏的切换
        active(){
            // 判断如果点击的是最后一个图标，跳转到栏目管理页
            if(this.active === this.categories.length - 1){
                this.$router.push("/栏目管理")
                return;
            }
             // 请求不同的栏目的数据
            this.getList();
        }
    },
    components: {
        PostItem1,
        PostItem2,
        PostItem3
    },

    mounted(){
        // 在请求之前，应该先判断本地有没栏目数据
        const categories = JSON.parse(localStorage.getItem("categories"));
        // 本地的token
        const {token} = JSON.parse(localStorage.getItem('userInfo')) || {};
        // 如果本地有数据，获取本地的数据来渲染
        if(categories){
            // 登录了(有token)但是第一条不是关注
            // 登录了(有token)但是第一条不是关注
            if(categories[0].name !== "关注" && token || categories[0].name === "关注" && !token){
                // 获取栏目数据
                this.getCategories(token);
                return;
            }
            else{
            this.categories = categories;
             // 给每个栏目都加上pageIndex = 1
            this.handleCategories();
            }
            
            
        }else{
            this.getCategories(token);
        }

        // 请求文章列表，页面一开始都是请求头条栏目下的文章，头条栏目的id是999 ！！！！！！！！！！！！！！
        this.$axios({
            url: "/post",
            // params就是url问号后面的参数
            params: {
                // category: 999
                category: this.categoryId,
                pageIndex: 1,
                pageSize: 5,
            }
        }).then(res => {
            console.log(res);
            // 文章的数据
            const {data} = res.data;
            // 保存到data的list中
            // this.list = data;
            // 如果是修改数组中某一项的属性，不会驱动视图的更新的
            this.categories[this.active].posts = data;
            // 赋值的方式可以引起模板的刷新
            this.categories = [...this.categories];
        })


    },

    methods:{
        // 循环给栏目加上pageIndex，每个栏目都是自己的pageIndex
        handleCategories(){
            this.categories = this.categories.map(v => {
                v.pageIndex = 1;
                v.posts = [];
                v.loading = false;
                v.finished = false;
                return v;
            })
        },

        // 获取栏目数据, 如果有token加上到头信息。没有就不加！！！！！！！！！！！！！！！！！！！！！！
         getCategories(token){
            const config = { url: "/category" }
            // 如果有token，把token添加到头信息中
            // 如果有token请求回来的数据就会有关注的栏目，因为代表是登录的
            // 如果没有token就没有关注的栏目
            if(token){
                config.headers = { Authorization: token };
            }
            // 没有本地的数据才去请求栏目接口!!!!!!!!!!!!!!!!!!!
            this.$axios(config).then(res => {
                // 菜单的数据
                const {data} = res.data;
                // 给data添加一个点击跳转到栏目管理的图标
                data.push({
                    name: "∨"
                })
                this.categories = data;
                // 把菜单的数据保存到本地
                localStorage.setItem("categories", JSON.stringify(data));
                // 给每个栏目都加上pageIndex = 1
                this.handleCategories();
            })
         },

        onLoad() {
            // 当前栏目下pageIndex加1
            this.categories[this.active].pageIndex += 1;

            // 请求文章列表
            this.getList();
            },

            getList(){
                // 如果当前的栏目数据已经加载完毕了，直接return；
                if(this.categories[this.active].finished){
                    return;
                }
                const {pageIndex, id} = this.categories[this.active];

                // 加载下一页的数据
                this.$axios({
                url: "/post",
                params: {
                    // pageIndex: this.categories[this.active].pageIndex,
                    category: id,
                    pageIndex: pageIndex,
                    pageSize: 5,
                    // category: this.categoryId,
                    }
                }).then(res => {
                    // console.log(res);  total 总共有多少条
                    const {data, total} = res.data;
                    // 把新的文章数据合并到原来的文章列表中
                    // this.list = [...this.list, ...data];
                    this.categories[this.active].posts = [...this.categories[this.active].posts, ...data]; 
                    // 加载状态结束
                    // this.loading = false;
                    this.categories[this.active].loading = false;
                    // 赋值的方式页面才会更新
                    this.categories=[...this.categories];
                    // 是否是最后一页
                    if(this.categories[this.active].posts.length === total){
                            // 当前栏目的文章已经加载完毕
                            this.categories[this.active].finished = true;
                        }
                    })
                },

        onRefresh() {
            // 表示加载完毕
            this.refreshing = false;
            console.log("正在下拉刷新")
            }
        }
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