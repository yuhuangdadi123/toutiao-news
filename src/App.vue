<template>
  <div id="app">
    
    <router-view/>
  </div>
</template>

<style lang="less">

@import url('../node_modules/vant/lib/index.css');
// 公共的样式
@import url("//at.alicdn.com/t/font_1426139_jm7n2373nlh.css");

*{
    margin: 0;
    padding: 0;
}

a {
    color: inherit;
    text-decoration: none;
}

a:hover{
    color: inherit;
}

ul, li, ol{
    list-style: none;
}

i, em{
    font-style: normal;
}

//媒体查询
.banxin {
    height: 17.708333rem;
  }
img {
    width: 100%;
}
//   先构建媒体查询与版心
  @media screen and (min-width: 375px){
    .banxin {
      width: 375px;
      margin: 0 auto;
    }
    /* 版心此时是750 */
  // 把版心分成10份
    html {
        font-size: 37.5px;
    }
}

// @media screen and (max-width:750px) and (min-width:540px){
//   .banxin {
//     width: 540px;
//     margin: 0 auto;
//   }
//   html {
//     font-size: 54px;
//   }
// }

// @media screen and (max-width:540px) and (min-width:480px){
//   .banxin {
//     width: 480px;
//     margin: 0 auto;
//   }

//   html {
//     /* 把版心分成10份 */
//     font-size: 48px;
//   }
// }

// @media screen and (max-width:480px){
//   .banxin {
//     width: 100%;
//   }
//   html {
//     font-size: 48px;
//   }
// }























</style>
