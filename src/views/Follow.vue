<template>
  <div>
    <!-- 顶部的导航条 -->
    <NavigateBar title="我的关注"  />

    <div class="user-item" v-for="(item,index) in follows" :key="index">
        <img :src="$axios.defaults.baseURL + item.head_img">
        <div class="user-info">
            <div>{{ item.nickname }}</div>
            <p>{{  moment(item.create_date).format('YYYY-MM-DD  hh:mm:ss') }}</p>
        </div>
        <span class="cancel" 
        @click="handleCancel(item.id,index)">
        取消关注</span>
    </div>

  </div>
</template>

<script>
import NavigateBar from "@/components/navigateBar"
//日期处理类库
import moment from "moment";

export default {
    data(){
        return {
            follows:[],
            userJson:{},
 	        moment, 
        }
    },
    components: {
        NavigateBar
    },
    mounted(){
        const userJson = JSON.parse(localStorage.getItem('userInfo'));
        this.userJson= userJson;
        //请求用户关注
        this.$axios({
            method:'get',
            url:"/user_follows",
            headers : {
                Authorization : userJson.token
            },
        }).then(res=>{
            // console.log(res);
            const {data} = res.data;
            this.follows = data;
        })
    },
    methods:{
        //取消关注
        handleCancel(id,index){
            // 询问是否取消弹窗
            this.$dialog.confirm({
 				title: '提示',
 				message: '您确定要取消关注该用户吗？'
 			}).then(() => {
                    this.$axios({
                    url:"/user_unfollow/" + id,
                    headers : {
                    Authorization : this.userJson.token
                    },
                }).then(res=>{
                this.$toast.success("取消关注成功");
                this.follows.splice(index,1);
                })
            })

            
        }
    }
}
</script>

<style scoped lang="less">
.user-item {
    padding: .555556rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px #555 solid;
    font-size: .444444rem;

    img {
        width: 1.111111rem;
        height: 1.111111rem;
        display: block;
        margin-right: .555556rem;
        border-radius: 50%;
        //防止图片变形
        object-fit: cover;
    }

    .user-info {
        flex: 1;

        p {
            font-size: .388889rem;
            color: #999;
        }
    }

    .cancel {
        width: 2.222222rem;
        height: .833333rem;
        border: #555 .027778rem solid;
        text-align: center;
        line-height: .833333rem;
        border-radius: .277778rem;
        background-color: #eee;
    }

}


</style>