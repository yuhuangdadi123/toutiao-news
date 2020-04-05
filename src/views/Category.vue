<template>
  <div>
    <!-- 头部导航组件 -->
    <NavigateBar title="栏目管理" />
    <!-- 栏目管理 -->
    <div class="content">

      <p class="del-title">点击删除以下频道</p>
      <div class="list">
        <span class="item"
        v-for="(item,index) in arrUp"
        :key="index"
        :class="['关注','头条'].includes(item.name)?`active`:``"
        @click="handDel(item,index)"
        >{{item.name}}</span>
      </div>
      
      <p class="add-title">点击添加以下频道</p>
      <div class="list">
        <span class="item"
            v-for="(item, index) in arrDown" 
            :key="index"
            @click="handAdd(item,index)"
            >
            {{item.name}}
            </span>
      </div>

    </div>
  </div>
</template>

<script>
import NavigateBar from "@/components/navigateBar";

export default {
data(){
    return{
        categories:[],
        // 显示在上面的数组
        arrUp: [],
        // 显示在下面的数据
        arrDown: []
    }
},

components: {
    NavigateBar,
},

mounted(){
    // 获取本地数据 存到data
    this.categories = JSON.parse(localStorage.getItem('categories'));
    // 拆分为 is_top 1  和 is_top 0 两个数组  用过筛数组的方法
    this.arrUp = this.categories.filter(v=>{
        return v.is_top === 1;
    });
    this.arrDown = this.categories.filter(v=>{
        return v.is_top === 0;
    })
},

methods:{
    // 封装一个点击删除栏目的方法
    handDel(item,index){
        // 头条跟关注不能删  点到他们 直接跳出这个函数 无效
        if(item.name === "关注" || item.name === "头条") return;
        // 把当前这项从arrUp数组中删除掉
        this.arrUp.splice(index,1);
        // 把他的is_top 由 1 改成 0
        item.is_top = 0; 
        // 再把它添加到下面的数组
        this.arrDown.push(item);
    },

    // 封装一个点击添加栏目的方法
    handAdd(item,index){   
        // 把当前这项从arrDown数组中删除掉
        this.arrDown.splice(index,1);
        // 把他的is_top 由 0 改成 1
        item.is_top = 1; 
        // 再把它添加到下面的数组
        this.arrUp.push(item);
    },




},

};
</script>

<style scoped lang='less'>
.content{
    padding: 0 .555556rem;
    p{
        font-size: .388889rem;
        margin: .555556rem 0 .277778rem 0;
        color: #8c8f91;
    }
    .list{
        display: flex;
        flex-wrap: wrap;
        .item{
            font-size: .5rem;
            border: .027778rem solid #999;
            padding: .277778rem;
            margin: .277778rem;
            width: 1.111111rem;
            height: .555556rem;
            line-height: .555556rem;
            text-align: center;
        }

        .active{
            border-color: #ddd;
            color:#999;
        }

    }
}


</style>
