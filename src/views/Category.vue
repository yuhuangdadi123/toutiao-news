<template>
  <div>
    <!-- 头部导航组件 -->
    <NavigateBar title="栏目管理" />
    <!-- 栏目管理 -->
    <div class="content">
      <p class="del-title">点击删除以下频道</p>
      <div class="list">
        <span class="item">推荐</span>
        <span class="item">推荐</span>
        <span class="item">推荐</span>
        <span class="item">推荐</span>
        <span class="item">推荐</span>
        <span class="item">推荐</span>
        <span class="item">推荐</span>
        <span class="item">推荐</span>
        <span class="item">推荐</span>
      </div>
      <p class="add-title">点击添加以下频道</p>
      <div class="list">
        <span class="item">推荐</span>
        <span class="item">推荐</span>
        <span class="item">推荐</span>
        <span class="item">推荐</span>
        <span class="item">推荐</span>
        <span class="item">推荐</span>
        <span class="item">推荐</span>
        <span class="item">推荐</span>
        <span class="item">推荐</span>
      </div>
    </div>
  </div>
</template>

<script>
import NavigateBar from "@/components/navigateBar";

export default {
  components: {
    NavigateBar,
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
    }
}


</style>
