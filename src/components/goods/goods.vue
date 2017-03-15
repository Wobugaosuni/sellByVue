<template>
  <div class="goods">
    <div class="menus-wrapper">
      <ul class="menus">
        <li v-for="item in goods" class="menu border-1px">
          <span class="text">
            <span v-if="item.type > 0" :class="'icon ' + menusIconMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper"></div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      goods: []
    };
  },
  created () {
    // ajax异步请求，获取goods数据
    this.axios.get('/api/goods').then((response) => {
      this.goods = response.data.data;
      console.log(this.goods);
    });
    this.menusIconMap = ['discount', 'decrease', 'special'];
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl";

menusWrapperWidth = 80px

  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    overflow: hidden

    .menus-wrapper
      flex: 0 0 80px
      width: menusWrapperWidth
      background-color: #f3f5f7

      .menus
        overflow: auto
        height: 100%

        .menu
          display: table
          width: menusWrapperWidth - 12 * 2
          height: 54px
          line-height: 14px
          margin: 0 12px
          font-size: 0
          border1px(rgba(7,17,27,0.1))

          .text
            display: table-cell
            vertical-align: middle
            font-size: 12px
            font-weight: 200
            line-height: 14px

            .icon
              display: inline-block
              width: 12px
              height: 12px
              background-size: 12px 12px
              background-repeat: no-repeat
              margin-right: 2px
              vertical-align: top

              &.discount
                bgImage('discount_3')

              &.decrease
                bgImage('decrease_3')

              &.special
                bgImage('special_3')

    .foods-wrapper
      flex: 1
</style>
