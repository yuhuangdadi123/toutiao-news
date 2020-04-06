<template>
  <div>
        <!-- 头部 -->
        <div class="header">
          <span class="iconfont iconjiantou2" @click="$router.back()"></span>
          <!-- 中间搜索框部分 -->
          <div class="search">
              <span class="iconfont iconsearch"></span>
              <!-- keyup.enter是键盘事件，keyup就是原生的onkeyup，enter就是确认键 -->
                <!-- autofocus打开页面 自动聚焦到input -->
              <input placeholder="请输入搜索关键字" autofocus 
              v-model="value"  @keyup.enter="handleSearch"/>
          </div>
          <!-- 搜索按钮 -->
          <span class="search-btn" @click="handleSearch">搜索</span>
        </div>
    
        <!-- 历史记录 -->
        <div class="record">
            <div class="title">
                <strong>历史记录</strong>
                <!-- X号 清除历史记录 -->
                <span class="iconfont iconicon-test"  @click="handleClear"></span>
            </div>
            <!-- 历史记录的列表 -->
            <div class="record-list">
                <span class="record-item" v-for="(item, index) in history" :key="index"
                @click="handleRecord(item)"
                >{{item}}</span>
            </div>
        </div>

        <!-- 搜索结果的浮层 -->
        <div class="result-layer" v-if="showLayer">
            <div class="result-item" v-for="(item,index) in list" :key="index" >
                <!-- <p>{{item.title}}</p>
                <span class="iconfont iconjiantou1"></span> -->
                <!-- 只有单张图片的 -->
                <PostItem1 :data="item" v-if="item.type === 1 && item.cover.length < 3"/> 
                <!-- 大于等于3张图片 -->
                <PostItem2 :data="item" v-if="item.type === 1 && item.cover.length >= 3"/> 
                <!-- 视频 -->
                <PostItem3 :data="item" v-if="item.type === 2"/>
            </div>
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
        return {
            value:'',
            // 历史记录,先获取本地的搜索记录，如果没有就是等于一个空数组
            history:JSON.parse(localStorage.getItem('history')) || [],
            // 是否展示浮层
            showLayer: false,
            // 文章列表
            list: [],
        }
    },

    components: {
        PostItem1,
        PostItem2,
        PostItem3
    },

    methods:{
        // 封装一个点击搜索事件
        handleSearch(){
            if(this.value == '') return;
            // 把当前搜索的内容添加到历史记录的数组里面去
            this.history.unshift(this.value);
            // 数组去除重复
            const arrnew = new Set(this.history); //获取的是一个对象 所以要解构
            this.history = [...arrnew];
            // 把搜索的内容添加到本地
            localStorage.setItem("history",JSON.stringify(this.history))
            // 根据输入的内容搜索文章
            this.getList();
        },

        // 封装一个清除历史记录的方法
        handleClear(){
            this.history = [];
            localStorage.removeItem('history');
        },

        //封装一个点击历史记录就能直接查询的方法
        handleRecord(item){
            this.value = item;
            // 根据输入的内容搜索文章
            this.getList();
        },

        // 封装一个搜索文章的方法
        getList(){
            this.$axios({
                url:"/post_search",
                params:{
                    keyword: this.value
                }
            }).then(res=>{
                // console.log(res);
                // 让浮层弹出
                this.showLayer = true;
                // 解构出文章列表
                const {data} = res.data;
                // 把文章列表保存到本地
                this.list = data;
            })
        }



    },

}
</script>

<style scoped lang="less">
.header{
    display: flex;
    padding: .555556rem;
    font-size: .5rem;
    justify-content: space-between;
    align-items: center;
    border-bottom: .027778rem solid #eee;

    .search{
        flex: 1;
        height: 1.055556rem;
        // width: 7.222222rem;
        border: .027778rem solid #757575;
        border-radius: .416667rem;
        padding: 0 .277778rem;
        margin: 0 .416667rem;

        input{
            border: 0;
            line-height: 1.055556rem;
        }

        .iconsearch{
            margin-right: .277778rem;
        }
    }
}

.record{
    font-size: .5rem;
    padding: .555556rem;
    .title{
        display: flex;
        justify-content: space-between;
    }

    .record-list{
        padding: .277778rem 0;
        display: flex;
        flex-wrap: wrap;
        
        .record-item{
        padding: .277778rem;
        border: 1px #ccc solid;
        margin: .277778rem ;
        }
    }
}

.result-layer{
    position: absolute;
    font-size: .5rem;
    top: 1.666667rem;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    overflow: hidden;
    padding: .555556rem 0;
    box-sizing: border-box;
    .result-item{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: .277778rem;
        border-bottom:1px #eee solid;

        p{
            flex: 1;
            margin-right: .277778rem;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
        span{
            color: #999;
        }
    }
}

</style>