<template>
  <div role="component:shopcart">
    <div class="content-wrapper">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo-content">
            <i class="icon-shopping_cart"></i>
          </div>
        </div>
        <div class="price-wrapper">￥0</div>
        <div class="vertical-divider-wrapper">
          <div class="divider-content vertical-divider"></div>
        </div>
        <div class="goods-describe">另需配送费￥{{seller.deliveryPrice}}元</div>
      </div>
      <div class="content-right">￥{{seller.minPrice}}元起</div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  export default {
    data () {
      return {
      };
    },
    props: {
      seller: {
        type: Object
      }
    }
  };
</script>

<style lang='stylus' rel='stylesheet/stylus'>
@import './shopcart.styl';

</style>
