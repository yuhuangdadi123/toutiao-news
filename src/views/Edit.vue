<template>
  <div>

    <!-- 头部导航组件 -->
    <NavigateBar title="编辑资料" />
    <!-- 头像 -->
    <div class="avatar">
        <img src="../assets/logo.png" alt="">
    </div>
    <!-- 按钮列表 -->
    <Listbar label="昵称" tips="火星网友" />

  </div>
</template>

<script>
import Listbar from "@/components/Listbar"
import NavigateBar from "@/components/navigateBar"

export default {
    components: {
        Listbar,
        NavigateBar
    },

}
</script>

<style lang="less" scoped>
.avatar{
    display: flex;
    padding: .555556rem;
    justify-content: center;
    align-items: center;
    img{
        width: 2.777778rem;
        height: 2.777778rem;
        border-radius: 50%;
    }
}

















</style>