
<template>
  <div class="infoContainer">
    这里是个人详情页面
    <span href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
    </span>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.infoContainer
    .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        > .iconfont
          font-size 20px
          color #999
</style>