<template>
  <div class="cart-control">
    <transition name="move">
      <div class="cart-minus" v-show="food.count" @click="onCartMinusClick">
        <span class="inner-icon icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count">{{food.count}}</div>
    <div class="cart-plus icon-add_circle" @click="onCartPlusClick"></div>
  </div>
</template>

<script type='text/ecmascript-6'>
import Vue from 'vue';
export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    onCartPlusClick: function () {
      // 属于goods组件内，引入了BScroll，所以需要先判断是否原生事件
      if (!event._constructed) {
        return;
      }
      // console.log('event', event);
      if (!this.food.count) {
        // 给对象添加新属性，vue是不能检测到变化的
        // 需要用Vue.set()接口来新增属性，检测属性的变化
        Vue.set(this.food, 'count', 1);
      } else {
        this.food.count ++;
      }
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
      transform translate3D(0, 0, 0)
      opacity 1

      .inner-icon
        display inline-block
        font-size 24px
        color rgb(0,160,220)
        cursor pointer
        transform rotate(0)
        transition all .4s linear

      &.move-enter-active, &.move-leave-active
        transition all .4s linear

      &.move-enter, .move-leave-active
        transform translate3D(24px, 0, 0)
        opacity 0

        .inner-icon
          transform rotate(180deg)

     .cart-plus
      padding 6px
      font-size 24px
      color rgb(0,160,220)
      cursor pointer

    .cart-count
      font-size 10px
      color rgb(147,153,159)

</style>
