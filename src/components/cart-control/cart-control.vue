<template>
  <div class="cart-control">
    <transition name="move">
      <div class="cart-minus icon-remove_circle_outline" v-show="food.count" @click="onCartMinusClick">
        <!--<span class="inner-icon icon-remove_circle_outline"></span>-->
      </div>
    </transition>
    <div class="cart-count" v-show="food.count">{{food.count}}</div>
    <div class="cart-plus icon-add_circle" @click="onCartPlusClick"></div>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  props: {
    food: {
      type: Object
    }
  },

  methods: {
    onCartPlusClick: function (event) {
      // 属于goods组件内，引入了BScroll，所以需要先判断是否原生事件
      if (!event._constructed) {
        return;
      }
      this.food.count ++;

      // 点击时把当前元素、及当前的food传给父组件
      this.$emit('addToCart', event.target, this.food);
    },

    onCartMinusClick: function () {
      // 属于goods组件内，引入了BScroll，所以需要先判断是否原生事件
      if (!event._constructed) {
        return;
      }
      // console.log('event', event);
      if (this.food.count) {
        this.food.count --;
      }
    }
  }
};
</script>

<style lang='stylus' rel='stylesheet/stylus'>
 .cart-control
  display flex
  align-items center
  font-size 0

  .cart-minus
    padding 6px
    font-size 24px
    color rgb(0,160,220)
    cursor pointer

    opacity 1
    transform translate3d(0, 0, 0) rotate(0)
    transition transform .4s linear, opacity .4s linear

    &.move-enter-active, &.move-leave-active
      transition transform .4s linear, opacity .4s linear

    &.move-enter, &.move-leave-active
      transform translate3d(36px, 0, 0) rotate(180deg)
      opacity 0

  .cart-plus
    padding 6px
    font-size 24px
    color rgb(0,160,220)
    cursor pointer

  .cart-count
    font-size 10px
    color rgb(147,153,159)
</style>
