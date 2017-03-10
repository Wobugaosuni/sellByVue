<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avator">
      <!-- src属性需要绑定(v-bind)，让数据成为动态的数据，否则会直接读成是一个路径 -->
        <img width='64' height='64' :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <!-- 加v-if判断，避免空指针异常。因为获取数据是异步的过程，开始初始化seller是一个空对象。将seller传给component header时就是一个空对象 -->
        <div class="support" v-if="seller.supports">
          <span class="icon"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
    </div>
    <div class="bulletin-wrapper">
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  export default {
    props: ['seller']
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

@import '../../common/stylus/mixin.styl';

  .header
    color: rgb(255,255,255)
    background: #000

    .content-wrapper
      padding: 24px 12px 18px 24px
      font-size: 0  // 消除子元素inline-block造成的空白间隙

      .avator
        display: inline-block
        margin-right: 16px
        vertical-align: top

        > img
          border-radius: 2px

      .content
        display: inline-block
        padding-top: 2px
        padding-bottom: 2px

        .title
          font-size: 0
          margin-bottom: 8px

          .brand
            display: inline-block
            width: 30px
            height: 18px
            margin-right: 6px
            bgImage('brand')
            background-size: 30px 18px
            background-repeat: no-repeat
            vertical-align: top

          .name
            font-size: 16px
            font-weight: bold
            line-height: 18px

        .description
          font-size: 12px
          margin-bottom: 10px

        .support
          font-size: 10px

        .description, .support
          font-weight: 200
          line-height: 12px
</style>
