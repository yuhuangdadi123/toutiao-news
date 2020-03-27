<template>
  <div class="banxin">
      <header>
          <div class="headimgbox">
              <div class="headimg">
                <img src="../assets/123.jpg">
              </div>
          </div>
          <div class="content">
              <span class="netname"><b class="iconfont iconxingbienan"></b>玉皇大帝</span>
              <span class="date">2019-10-10</span>
          </div>
          <div class="jiantou">
              <span class="iconfont iconjiantou1"></span>
          </div>
      </header>
      <nav>
          <ul>
              <li>我的关注<span class="list-content">关注的用户<span class="iconfont iconjiantou1"></span></span></li>
              <li>我的跟帖<span class="list-content">跟帖/回复<span class="iconfont iconjiantou1"></span></span></li>
              <li>我的收藏<span class="list-content">文章/视频<span class="iconfont iconjiantou1"></span></span></li>
              <li>设置<span class="list-content"><span class="iconfont iconjiantou1"></span></span></li>
          </ul>
      </nav>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.banxin {
    padding: .533333rem 0 .533333rem 0;
    background-color: #f2f2f2;
}

header {
    padding: .8rem ;
    display: flex;
    justify-content: center;
    border-bottom: .133333rem solid #e4e4e4;
}

.headimgbox {
    width: 30%;
     display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.headimgbox .headimg {
    width: 1.866667rem;
    height: 1.866667rem;
    border-radius: 50%;
    overflow: hidden;
}

.headimg img {
    width: 1.866667rem;
    height: 1.866667rem;
    vertical-align: middle
}

.content {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}

.content span {
    // align-self: flex-start;
    font-size: .426667rem;
}

.content .netname .iconxingbienan {
    color: #3a92ff;
    // background-color: #fff;
    font-size: .48rem;
    margin-right: .133333rem;
}

.content .netname {
    margin-bottom: .133333rem;
}

.content .date {
    font-size: .373333rem;
    color: #c2c2c2;
}

.jiantou {
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
}

.jiantou .iconjiantou1 {
    font-size: .8rem;
    color: #c2c2c2;
}



nav {
    padding: .533333rem;
}

nav ul li {
    font-size: .426667rem;
    height: 1.2rem;
    line-height: 1.2rem;
    border-bottom: .026667rem solid #e4e4e4;
    display: flex;
}

nav ul li .list-content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: #999;
}

</style>