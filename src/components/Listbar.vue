<template>
  <!-- 列表按钮栏 -->
    <div class="listbar">
        <router-link :to="path || '#'">
            <div>{{label}}</div>
            <div>{{tips}}<span class="iconfont iconjiantou1"></span></div>
        </router-link>
    </div>
</template>

<script>
export default {
    props:['label','tips','path'],

}
</script>

<style lang="less" scoped>

.listbar {
    padding-left: .555556rem;
    height: 1.388889rem;
    line-height: 1.388889rem;

    a {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: .444444rem;
        border-bottom: .027778rem #eeeeee solid;
        padding-right: .277778rem;
    }

    .tips {
        color: #999;

        span {
            margin-left: .138889rem;
        }
    }

}




</style>