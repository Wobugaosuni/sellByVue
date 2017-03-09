<template>
  <div id="app">
    <v-header></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
  </div>
</template>

<script>
import header from './components/header/header.vue';

export default {
  name: 'app',
  components: {
    'v-header': header
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">

/* mixin.styl的引入需要加@
 * 虽然在main.js全局引入了，但还是需要在每个组件中单独引入
 * 需要在每个组件引入依赖的 mixin.styl 文件，因为在 stylus 编译的时候，它需要能给根据依赖的文件去查找是否定义了这个 mixin，然后把对应的代码替换到当前 stylus 文件里
 */
@import "./common/stylus/mixin.styl"

#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50

  .tab
    display: flex
    width: 100%
    border1px(rgba(7,17,27,0.1))
    // border-bottom: 1px solid rgba(7,17,27,0.1)

    .tab-item
      flex: 1
      height: 40px
      line-height: 40px
      text-align: center
      font-size: 14px
      color: rgb(77,85,93)

      > a
        color: rgb(77,85,93)
        display: block

      .router-link-active
        color: rgb(240,20,20)
</style>
