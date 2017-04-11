<template>
  <div class="cart-control">
    <div class="cart-minus icon-remove_circle_outline"></div>
    <div class="cart-count">2</div>
    <div class="cart-plus icon-add_circle"></div>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  props: {
    food: {
      type: Object
    }
  },
  created () {
    console.log('get cart control food', this.food);
  }
};
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  .cart-control
    display flex
    align-items center
    font-size 0

    .cart-minus, .cart-plus
      padding 6px 12px
      font-size 24px
      color rgb(0,160,220)

    .cart-count
      font-size 10px
      color rgb(147,153,159)

</style>
