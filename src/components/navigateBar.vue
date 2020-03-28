<template>
  <div class="navigate-bar">
    <!-- $router.back()是实例下的属性，可以直接在模板中渲染 -->
    <span class="iconfont iconjiantou2" @click="$router.back()"></span>
    <strong>个人中心</strong>
    <!-- $router.push()是实例下的属性，可以直接在模板中渲染 -->
    <span class="iconfont iconshouye" @click="$router.push('/')"></span>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.navigate-bar{
 	line-height: 1.388889rem;
 	display: flex;
 	justify-content: space-between;
 	align-items:center;
 	padding: .138889rem .555556rem;
 	border-bottom:1px #eee solid;

 	.iconshouye{
 		font-size: .555556rem;
     }
     
     strong {
         font-size: .555556rem;
         font-family: '楷体';
         color: #2bd4ee;
     }
 }
</style>
