<template>
  <div>
        <!-- 头部 -->
        <div class="header">
          <span class="iconfont iconjiantou2"></span>
          <!-- 中间搜索框部分 -->
          <div class="search">
              <span class="iconfont iconsearch"></span>
              <input placeholder="请输入搜索关键字"/>
          </div>
          <!-- 搜索按钮 -->
          <span class="search-btn">搜索</span>
        </div>
    
        <!-- 历史记录 -->
        <div class="record">
            <div class="title">
                <strong>历史记录</strong>
                <span class="iconfont iconicon-test"></span>
            </div>
            <div class="record-list">
                <span class="record-item">美女</span>
                <span class="record-item">美女美女美女美女</span>
                <span class="record-item">美女美女</span>
                <span class="record-item">美女美</span>
                <span class="record-item">美</span>
                <span class="record-item">美女美女美女美</span>
            </div>
        </div>

  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
.header{
    display: flex;
    padding: .555556rem;
    font-size: .5rem;
    justify-content: space-between;
    align-items: center;

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


</style>