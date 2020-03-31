<template>
  <div>
    <!-- 顶部的导航条 -->
    <NavigateBar title="我的收藏" />

    <div v-for="(item, index) in stars" :key="index">

        <!-- 循环的结构,少于3张图片的布局 -->
        <div class="star" v-if="item.cover.length < 3 && item.cover.length > 0">
        <div class="imgtext">
            <h4>{{ item.title }}</h4>
            <p>{{item.user.nickname}}  {{item.comments.length}}跟帖</p>
        </div>
        <img :src="$axios.defaults.baseURL + item.cover[0].url" />
        </div>

        <!-- 循环的结构,大于3张图片的布局 -->
        <!-- <div class="imgList">
        <h4>林志玲穿透视黑纱裙米兰看秀腹部微隆显孕味</h4>
        <div class="images">
            <img src="https://www.baidu.com/img/bd_logo1.png" />
            <img src="https://www.baidu.com/img/bd_logo1.png" />
            <img src="https://www.baidu.com/img/bd_logo1.png" />
        </div>
        <p>火星时报 52跟帖</p>
        </div> -->

    </div>

  </div>
</template>

<script>
import NavigateBar from "@/components/navigateBar";

export default {
  data() {
    return {
        stars:[],
    };
  },
  components: {
    NavigateBar
  },
  mounted(){
      const userJson = JSON.parse(localStorage.getItem('userInfo'));
      this.$axios({
          url:"/user_star/",
          headers : {
                Authorization : userJson.token
            },
      }).then(res=>{
        //   console.log(res);
        const {data} = res.data;
        this.stars = data;

      })
  }


};
</script>

<style scoped lang="less">
.star {
  display: flex;
  padding: 0.416667rem;

  .imgtext {
    flex: 0 0 65%;

    h4 {
      margin-bottom: .277778rem;
      font-size: .555556rem;
      font-style: normal;
    }

    p {
      color: #999;
      font-size: 0.444444rem;
    }
  }

  img {
    width: 3.055556rem;
    height: 2.083333rem;
    margin-left: 0.277778rem;
    object-fit: cover;
  }
}

.imgList{
    padding: .277778rem;
    h4{
        margin-bottom: .138889rem;
        font-size: .555556rem;
        font-style: normal;
    }
    .images {
        display: flex;
        justify-content: space-between;
        margin-bottom: .277778rem;
        img{
            width: 3.055556rem;
            height: 2.083333rem;
            flex: 0 0 31%;
            object-fit:cover;
        }

    }
    p {
      color: #999;
      font-size: 0.444444rem;
    }
}







</style>
