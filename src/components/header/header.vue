<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
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
          <span :class="'icon ' + bgImageMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="support-count" v-on:click="onDetailShowClick">
        <span class="count" v-if="seller.supports">
          {{seller.supports.length}}个
        </span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="onDetailShowClick">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background" :style="'background-image: url(' + seller.avatar +')'"></div>
    <div class="detail" v-show="detailShow">
      <div class="detail-wrapper">
        <h3 class="name">
          {{seller.name}}
        </h3>

      </div>
      <div class="footer-wrapper" v-on:click="onDetailHideClick">
        <i class="icon-close"></i>
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  export default {
    props: ['seller'],
    data () {
      return {
        detailShow: false
      };
    },
    methods: {
      onDetailShowClick: function () {
        this.detailShow = true;
      },
      onDetailHideClick: function () {
        this.detailShow = false;
      }
    },
    created () {
      this.bgImageMap = ['discount', 'decrease', 'special', 'invoice', 'guarantee'];
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

@import '../../common/stylus/mixin.styl';

  .header
    position: relative
    color: rgb(255,255,255)
    background: rgba(7,17,27,0.5)
    overflow: hidden

    .content-wrapper
      position: relative
      padding: 24px 12px 18px 24px
      font-size: 0  // 消除子元素inline-block造成的空白间隙

      .avatar
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

          .icon
            display: inline-block
            width: 12px
            height: 12px
            margin-right: 4px
            vertical-align: top
            background-size: 12px 12px
            background-repeat: no-repeat

            &.decrease
              bgImage('decrease_1')

            &.discount
              bgImage('discount_1')

            &.guarantee
              bgImage('guarantee_1')

            &.invoice
              bgImage('invoice_1')

            &.special
              bgImage('special_1')

          .text
            line-height: 12px

      .support-count
        position: absolute
        right: 12px
        bottom: 18px
        padding: 7px 8px
        background-color: rgba(0,0,0,0.2)
        border-radius: 14px
        font-size: 10px

        .count
          line-height: 12px
          vertical-align: top
          margin-right: 2px

        .icon-keyboard_arrow_right
          line-height: 12px

    .bulletin-wrapper
      position: relative
      height: 28px
      line-height: 28px
      padding: 0 22px 0 12px
      background-color: rgba(7,17,27,0.2)
      overflow: hidden
      white-space: nowrap
      text-overflow: ellipsis
      font-size: 10px

      .bulletin-title
        display: inline-block
        width: 22px
        height: 12px
        vertical-align: top
        margin-top: 7px
        background-size: 22px 12px
        background-repeat: no-repeat
        bgImage('bulletin')

      .bulletin-text
        margin: 0 4px
        vertical-align: top

      .icon-keyboard_arrow_right
        position: absolute
        right: 12px
        line-height: inherit

    .background
      position: absolute
      left: 0
      top: 0
      z-index: -1
      width: 100%
      height: 100%
      background-size: cover
      filter: blur(10px)  // 设置背景模糊

/*
 * detail弹窗使用sticky footers布局: https://www.w3cplus.com/css3/css-secrets/sticky-footers.html
 */
    .detail
      position: fixed
      top: 0
      left: 0
      z-index: 100
      width: 100%
      height: 100%
      overflow: auto
      background-color: rgba(7,17,27,0.8)

      .detail-wrapper
        box-sizing: border-box
        min-height: 100%
        padding: 64px 36px 64px

        .name
          margin: 0
          padding: 0
          font-size: 16px
          font-weight: 700
          line-height: 16px
          text-align: center

      .footer-wrapper
        margin-top: -64px
        text-align: center

        .icon-close
          font-size: 32px
          color: rgba(255,255,255,0.5)
</style>
